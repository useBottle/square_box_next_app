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

// * 실시간 검색어 관련 인터페이스

// 실시간 검색어
export interface TopicsType {
  rank: number;
  keyword: string;
  state: string;
  summary: string;
}

// 실시간 검색어 별 뉴스 리스트
export interface TopicsListType {
  keyword: string;
  newsList: newsList[];
}

// TopicsContainer Props
export interface TopicsProps {
  data: {
    keywordsData: TopicsType[] | undefined;
    newsOfTopicsList: TopicsListType[] | undefined;
  };
}

// 실시간 검색어 연관 뉴스 리스트 중 단일 뉴스 기사
export interface articleOnTopic {
  title: string;
  date: string[];
  image: string;
  alt: string;
  text: string[];
}

// * 뉴스 관련 인터페이스

// 최신 뉴스 단일 기사
export interface LatestNewsArticle {
  title: string;
  date: string;
  image: string;
  alt: string;
  text: string[];
}

// LatestNewsContainer Props
export interface LatestNewsProps {
  data: {
    latestNewsList: newsList[];
    latestArticles: LatestNewsArticle[];
  };
}

// 뉴스 리스트
export interface newsList {
  title: string;
  prevImg: string;
  href: string;
  date: string;
  summary: string;
}

// 뉴스 리스트 + 검색 키워드 + 리스트 요소 별 URL 배열
export interface newsListExtends {
  newsList: newsList[];
  keyword: string;
  urls: string[];
}

// 뉴스 리스트 + 검색 키워드
export interface newsListWithKeyword {
  keyword: string;
  newsList: newsList[];
}

// 각 URL 로 요청해 받아온 뉴스 단일 기사
export interface articleData {
  title: string;
  image: string;
  alt: string;
  date: string[];
  text: string[];
}

// 뉴스 기사들 데이터 + 검색 키워드
export interface articlesWithKeyword {
  keyword: string;
  articles: articleData[];
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

// 유튜브 상세 페이지 단일 영상 타입
export interface currentYoutubeVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
  thumbnail: string;
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
  category: string;
}

// 북마크 유튜브 데이터
export interface MarkedYoutubeVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
  thumbnail: string;
  username: string;
  createdAt: Date;
  category: string;
}
