import { articleOnTopic, newsList, newsListExtends, newsListWithKeyword } from "@/types/types";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// 검색한 뉴스 키워드에 대한 뉴스 리스트 요청 미들웨어
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

interface newsType {
  newsList: {
    keyword: string;
    newsList: newsList[];
  };
  article: articleOnTopic;
  urls: string[];
  url: string;
  popularStatus: "idle" | "loading" | "succeeded" | "failed";
  newsStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: newsType = {
  newsList: {
    keyword: "",
    newsList: [],
  },
  article: {
    title: "",
    date: [],
    image: "",
    alt: "",
    text: [],
  },
  urls: [],
  url: "",
  popularStatus: "idle",
  newsStatus: "idle",
};

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsList(state, action: PayloadAction<newsListWithKeyword>) {
      state.newsList = action.payload;
    },
    setSingleArticle(state, action: PayloadAction<articleOnTopic>) {
      state.article = action.payload;
    },
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
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
      });
  },
});

export const { setNewsList, setSingleArticle, setUrl } = news.actions;
export default news.reducer;
