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
  text: string[];
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

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
    standard: {
      url: string;
      width: number;
      height: number;
    };
    maxres: {
      url: string;
      width: number;
      height: number;
    };
  };
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage: string;
}

export interface YouTubeVideo {
  kind: string;
  etag: string;
  id: {
    videoId: string;
    kind: string;
  };
  snippet: Snippet;
}

export interface youtubeApiResult {
  kind: string;
  etag: string;
  items: YouTubeVideo[];
  nextPageToken: string;
  pageInfo: PageInfo;
}
