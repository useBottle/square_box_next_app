import { articleData, articlesWithKeyword, newsList, newsListExtends, newsListWithKeyword } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// 뉴스 전체 데이터 요청 미들웨어
export const fetchNewsList = createAsyncThunk<newsListExtends, string>(
  "data/fetchNewsList",
  async (inputValue: string): Promise<newsListExtends> => {
    try {
      if (inputValue === "") return { keyword: "", newsList: [], urls: [] };

      const response = await axios.post("/api/news", { inputValue: inputValue, sort: "relation" });
      const result = response.data.newsList;
      const urls: string[] = [];
      result.map((item: newsList) => {
        if (item.href !== "") {
          urls.push(item.href);
        }
      });
      const data = {
        keyword: inputValue,
        newsList: result,
        urls: urls,
      };
      return data;
    } catch (error) {
      console.error("News fetch failed on middleware.", error);
      return { keyword: "", newsList: [], urls: [] };
    }
  },
);

// 뉴스 개별 데이터 요청 미들웨어
export const fetchArticles = createAsyncThunk<articlesWithKeyword, { urls: string[]; keyword: string }>(
  "data/fetchArticles",
  async ({ urls, keyword }: { urls: string[]; keyword: string }) => {
    try {
      const requestArticles = await axios.post("/api/articles", { urls: urls });
      const data = {
        keyword: keyword,
        articles: requestArticles.data.articlesData,
      };
      return data;
    } catch (error) {
      console.error("Articles fetch failed on middleware.", error);
      return { keyword: "", articles: [] };
    }
  },
);

interface newsType {
  newsList: {
    keyword: string;
    newsList: newsList[];
  };
  articles: {
    keyword: string;
    articles: articleData[];
  };
  totalArticles: { keyword: string; articles: articleData[] }[];
  urls: string[];
  popularStatus: "idle" | "loading" | "succeeded" | "failed";
  newsStatus: "idle" | "loading" | "succeeded" | "failed";
  articleStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: newsType = {
  newsList: {
    keyword: "",
    newsList: [],
  },
  articles: {
    keyword: "",
    articles: [],
  },
  totalArticles: [],
  urls: [],
  popularStatus: "idle",
  newsStatus: "idle",
  articleStatus: "idle",
};

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsList(state, action: PayloadAction<newsListWithKeyword>) {
      state.newsList.keyword = action.payload.keyword;
      state.newsList.newsList = action.payload.newsList;
    },
    setArticles(state, action: PayloadAction<articlesWithKeyword>) {
      state.articles = action.payload;
    },
    setTotalArticles(state, action: PayloadAction<{ keyword: string; articles: articleData[] }[]>) {
      state.totalArticles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // 뉴스 전체 데이터 요청 수행 결과 처리
      .addCase(fetchNewsList.pending, (state) => {
        state.newsStatus = "loading";
      })
      .addCase(fetchNewsList.fulfilled, (state, action: PayloadAction<newsListExtends | undefined>) => {
        state.newsStatus = "succeeded";
        if (action.payload) {
          state.newsList.keyword = action.payload.keyword;
          state.newsList.newsList = action.payload.newsList;
          state.urls = action.payload.urls;
        }
      })
      .addCase(fetchNewsList.rejected, (state) => {
        state.newsStatus = "failed";
      })

      // 뉴스 개별 데이터 요청 수행 결과 처리
      .addCase(fetchArticles.pending, (state) => {
        state.articleStatus = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<articlesWithKeyword | undefined>) => {
        state.articleStatus = "succeeded";
        if (action.payload) {
          state.articles.keyword = action.payload.keyword;
          state.articles.articles = action.payload.articles;
        }
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.articleStatus = "failed";
      });
  },
});

export const { setNewsList, setArticles } = news.actions;
export default news.reducer;
