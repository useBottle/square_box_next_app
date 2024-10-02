import dbConnect from "@/util/database";
import NextAuth, { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import bcrypt from "bcrypt";
import Users from "@/models/users";
import refreshAccessToken from "@/util/socialReissuance";

export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          console.log("Credentials were not provided.");
        } else {
          await dbConnect();
          const user = await Users.findOne({ email: credentials.email });
          if (!user) {
            console.log("No such email");
            return null;
          }
          if (!user.password) {
            console.log("Password of account is not exist. (social account)");
            throw new Error("Already exist with social account.");
          }
          const pwcheck = await bcrypt.compare(credentials.password, user.password);
          if (!pwcheck) {
            console.log("Wrong password");
            return null;
          }
          return user;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 1 * 60 * 60,
  },
  secret: process.env.JWT_PW,
  callbacks: {
    async jwt({ token, account, user }: { token: JWT; account?: Account | null; user?: User }): Promise<JWT> {
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        if (account.expires_in) {
          token.accessTokenExpires = Date.now() + (account.expires_in as number) * 1000;
        } else if (account.expires_at) {
          token.accessTokenExpires = account.expires_at;
        }
        token.provider = account.provider;

        await dbConnect();
        const existingUser = await Users.findOne({ email: user.email });

        if (!existingUser) {
          await Users.create({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image,
            provider: token.provider,
          });
        }
        token.id = user.id;

        // 액세스 토큰이 만료되지 않았다면 기존 토큰 반환
        if (Date.now() < (token.accessTokenExpires as number)) {
          return token;
        }

        // 액세스 토큰이 만료된 경우, 제공자별로 리프레시 토큰으로 갱신 처리
        else {
          return refreshAccessToken(token);
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.name = token.name ?? "";
      }
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
