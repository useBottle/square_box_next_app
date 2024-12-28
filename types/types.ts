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

export interface LatestNewsArticle {
  title: string;
  date: string;
  image: string;
  alt: string;
  text: string;
}

export interface newsList {
  title: string;
  prevImg: string;
  href: string;
  date: string;
  summary: string;
}

export interface articleData {
  image: string;
  alt: string;
  text: string[];
}
