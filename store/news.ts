import {
  articleData,
  articleOnTopic,
  articlesWithKeyword,
  newsList,
  newsListExtends,
  newsListWithKeyword,
} from "@/types/types";
import * as cheerio from "cheerio";

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

// 검색한 뉴스 키워드에 대한 각각의 개별 뉴스 기사 요청 미들웨어
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

// 하나의 url 에 대한 뉴스 기사 요청 미들웨어
export const fetchSingleArticle = createAsyncThunk<articleOnTopic, string>(
  "data/fetchSingleArticle",
  async (url: string): Promise<articleOnTopic> => {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const title = $(".col-main .title").text().trim();
      const img = $(".img-box img").attr("src");
      const alt = $(".img-box img").attr("alt");
      let date: string[] = [];
      $(".info .wrt-text dd").map((_, item) => {
        date.push($(item).text().trim());
      });
      const text = $(".editor-p")
        .map((_, item) => $(item).text().trim())
        .get()
        .filter((item) => item !== "");

      const article = {
        title: title || "",
        image: img || "",
        alt: alt || "",
        date: date,
        text: text,
      };
      // console.log(article);
      return article;
    } catch (error) {
      console.error("Single article fetch failed on middleware.", error);
      return { title: "", date: [], image: "", alt: "", text: [] };
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
  article: articleOnTopic;
  urls: string[];
  url: string;
  popularStatus: "idle" | "loading" | "succeeded" | "failed";
  newsStatus: "idle" | "loading" | "succeeded" | "failed";
  articlesStatus: "idle" | "loading" | "succeeded" | "failed";
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
  articlesStatus: "idle",
  articleStatus: "idle",
};

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsList(state, action: PayloadAction<newsListWithKeyword>) {
      state.newsList = action.payload;
    },
    setArticles(state, action: PayloadAction<articlesWithKeyword>) {
      state.articles = action.payload;
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
      })

      // 뉴스 개별 데이터 요청 수행 결과 처리
      .addCase(fetchArticles.pending, (state) => {
        state.articlesStatus = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<articlesWithKeyword | undefined>) => {
        state.articlesStatus = "succeeded";
        if (action.payload) {
          state.articles = action.payload;
        }
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.articleStatus = "failed";
      })
      .addCase(fetchSingleArticle.pending, (state) => {
        state.articleStatus = "loading";
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action: PayloadAction<articleOnTopic | undefined>) => {
        state.articleStatus = "succeeded";
        if (action.payload) {
          state.article = action.payload;
        }
      })
      .addCase(fetchSingleArticle.rejected, (state) => {
        state.articleStatus = "failed";
      });
  },
});

export const { setNewsList, setArticles, setSingleArticle, setUrl } = news.actions;
export default news.reducer;
