export interface AuthedUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: string;
  refreshToken: string;
  createdAt: Date;
}

export interface TopicsType {
  rank: number;
  keyword: string;
  state: string;
  summary: string;
}
