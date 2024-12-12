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

export interface PopularNews {
  desc: string;
  image: string;
  link: string;
  name: string;
  title: string;
}

export interface newsData {
  title: string;
  image: string;
  alt: string;
  date: string;
  summary: string;
  text: string;
}
