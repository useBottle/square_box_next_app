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
