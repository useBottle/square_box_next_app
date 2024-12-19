import { articleData, newsList } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk<[newsList[], string[]], string>(
  "data/fetchNews",
  async (inputValue: string) => {
    try {
      if (inputValue === "") return [[], []];

      const response = await axios.post("/api/news", { inputValue: inputValue, sort: "relation" });
      const result = response.data.newsData;
      const urls: string[] = [];
      result.map((item: newsList) => {
        if (item.href !== "") {
          urls.push(item.href);
        }
      });
      return [result, urls];
    } catch (error) {
      console.error(error);
      return [[], []];
    }
  },
);

export const fetchArticles = createAsyncThunk<articleData[], string[]>("data/fetchArticles", async (urls: string[]) => {
  try {
    const requestArticles = await axios.post("/api/articles", { url: urls });
    return requestArticles.data.articleData;
  } catch (error) {
    console.error(error);
    return [];
  }
});

interface newsType {
  newsList: newsList[];
  article: articleData[];
  urls: string[];
  access: boolean;
  newsStatus: "idle" | "loading" | "succeeded" | "failed";
  articleStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: newsType = {
  newsList: [],
  article: [],
  urls: [],
  access: false,
  newsStatus: "idle",
  articleStatus: "idle",
};

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews(state, action: PayloadAction<newsList[]>) {
      state.newsList = action.payload;
    },
    setArticles(state, action: PayloadAction<articleData[]>) {
      state.article = action.payload;
    },
    setNewsAccess(state, action: PayloadAction<boolean>) {
      state.access = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.newsStatus = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<[newsList[], string[]] | undefined>) => {
        state.newsStatus = "succeeded";
        if (action.payload) {
          state.newsList = action.payload[0];
          state.urls = action.payload[1];
        }
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsStatus = "failed";
      })
      .addCase(fetchArticles.pending, (state) => {
        state.articleStatus = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<articleData[] | undefined>) => {
        state.articleStatus = "succeeded";
        if (action.payload) {
          state.article = action.payload;
        }
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.articleStatus = "failed";
      });
  },
});

export const { setNews, setArticles, setNewsAccess } = news.actions;
export default news.reducer;
