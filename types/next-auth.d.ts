import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?: string;
    expires?: number;
    user: {
      name?: string;
      email?: string;
      image?: string;
      provider?: string;
    };
  }

  interface User extends DefaultUser {
    password?: string;
  }
}
