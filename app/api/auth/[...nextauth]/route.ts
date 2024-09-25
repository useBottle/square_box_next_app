import Users from "@/models/users";
import dbConnect from "@/util/database";
import NextAuth, { Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";

async function refreshAccessToken(token: JWT) {
  try {
    let url;

    const googleParams = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_CLIENT_ID!,
      refresh_token: token.refreshToken! as string,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    });

    const kakaoParams = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.KAKAO_CLIENT_ID!,
      refresh_token: token.refreshToken! as string,
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
    });

    // 제공자에 따라 다른 토큰 엔드포인트로 요청
    if (token.provider === "google") {
      url = "https://oauth2.googleapis.com/token";
    } else if (token.provider === "kakao") {
      url = "https://kauth.kakao.com/oauth/token";
    } else {
      throw new Error("Unknown provider");
    }

    const response = await fetch(url, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: token.provider === "google" ? googleParams : kakaoParams,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: refreshedTokens.expires_in
        ? Date.now() + refreshedTokens.expires_in * 1000
        : refreshedTokens.expires_at,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // 리프레시 토큰이 제공되지 않으면 기존 값 사용
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions = {
  providers: [
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
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.JWT_PW,
  callbacks: {
    async jwt({ token, account, user }: { token: JWT; account?: Account | null; user?: User }) {
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
            image: user.image,
            provider: token.provider,
          });
        }
        token.id = user.id;
      }

      // 액세스 토큰이 만료되지 않았다면 기존 토큰 반환
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // 액세스 토큰이 만료된 경우, 제공자별로 리프레시 토큰으로 갱신 처리
      return refreshAccessToken(token);
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
