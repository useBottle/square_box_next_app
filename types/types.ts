export interface SocialUser {
  name: string;
  email: string;
  image?: string;
  provider?: string;
  createdAt: Date;
}

export interface CredentialsUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  provider?: string;
  createdAt: Date;
}
