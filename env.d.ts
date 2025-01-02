declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URI: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    JWT_PW: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
    TOPICS_API_URL: string;
    NEWS_SEARCH_API: string;
    LATEST_NEWS_API: string;
    YOUTUBE_API_KEY: string;
  }
}
