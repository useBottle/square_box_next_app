import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    provider?: string;
    error?: string;
  }

  interface User extends DefaultUser {
    password?: string;
  }
}
