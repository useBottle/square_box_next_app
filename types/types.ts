// 인증된 유저
export interface AuthedUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: string;
  refreshToken: string;
  createdAt: Date;
}

// 실시간 검색어
export interface TopicsType {
  rank: number;
  keyword: string;
  state: string;
  summary: string;
}

// 최신 뉴스 단일 기사
export interface LatestNewsArticle {
  title: string;
  date: string;
  image: string;
  alt: string;
  text: string[];
}

// 뉴스 리스트
export interface newsList {
  title: string;
  prevImg: string;
  href: string;
  date: string;
  summary: string;
}

// 각 URL 로 요청해 받아온 뉴스 단일 기사
export interface articleData {
  image: string;
  alt: string;
  date: string[];
  text: string[];
}

// 뉴스 단일 기사 완전한 타입
export interface currentArticle {
  title: string;
  date: string;
  image: string;
  alt: string;
  text: string[];
}

// * 유튜브 관련 인터페이스

// 유튜브 검색 결과 PageInfo
export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

// 유튜브 단일 컨텐츠 Snippet
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

// 유튜브 단일 컨텐츠
export interface YouTubeVideo {
  kind: string;
  etag: string;
  id: {
    videoId: string;
    kind: string;
  };
  snippet: Snippet;
}

// 유튜브 검색 결과 전체
export interface youtubeApiResult {
  kind: string;
  etag: string;
  items: YouTubeVideo[];
  nextPageToken: string;
  pageInfo: PageInfo;
}

// * 북마크 관련 인터페이스

// 북마크 뉴스 기사
export interface MarkedNewsArticle {
  title: string;
  date: string;
  image: string;
  alt: string;
  text: string[];
  username: string;
  createdAt: Date;
}

// 북마크 유튜브 데이터
export interface MarkedYoutubeVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
  thumbnails: string;
  username: string;
  createdAt: Date;
}
