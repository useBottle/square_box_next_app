import { LatestNewsArticle, newsList } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as cheerio from "cheerio";

// 최신 뉴스 기사 하나의 url 에 대한 뉴스 기사 요청 미들웨어
export const fetchLatestNewsArticle = createAsyncThunk<LatestNewsArticle, string>(
  "data/fetchLatestNewsArticle",
  async (url: string): Promise<LatestNewsArticle> => {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const title = $(".title-article01 h1.tit").text().trim();
      const date = $(".title-article01 .update-time").attr("data-published-time");
      const img = $(".image-zone .img-con .img img").attr("src");
      const alt = $(".image-zone .desc-con .tit-cap").text().trim();
      const text = $(".story-news.article p:not(.txt-copyright.adrs)")
        .map((_, item) => $(item).text().trim())
        .get()
        .filter((item) => item !== "");

      const data = {
        title: title,
        date: date || "",
        image: img || "",
        alt: alt || "",
        text: text,
      };
      // console.log(article);
      return data;
    } catch (error) {
      console.error("Single article fetch failed on middleware.", error);
      return { title: "", date: "", image: "", alt: "", text: [] };
    }
  },
);

interface LatestNewsType {
  latestNewsList: newsList[];
  latestNewsArticleSet: LatestNewsArticle[];
  latestNewsArticle: LatestNewsArticle;
  latestNewsStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: LatestNewsType = {
  latestNewsList: [],
  latestNewsArticleSet: [],
  latestNewsArticle: {
    title: "",
    date: "",
    image: "",
    alt: "",
    text: [],
  },
  latestNewsStatus: "idle",
};

export const latestNews = createSlice({
  name: "latestNews",
  initialState,
  reducers: {
    setLatestNewsList(state, action) {
      state.latestNewsList = action.payload;
    },
    setLatestNewsArticleSet(state, action) {
      state.latestNewsArticleSet = action.payload;
    },
    setLatestNewsArticle(state, action) {
      state.latestNewsArticle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestNewsArticle.fulfilled, (state, action: PayloadAction<LatestNewsArticle>) => {
        state.latestNewsStatus = "succeeded";
        state.latestNewsArticle = action.payload;
      })
      .addCase(fetchLatestNewsArticle.rejected, (state) => {
        state.latestNewsStatus = "failed";
      })
      .addCase(fetchLatestNewsArticle.pending, (state) => {
        state.latestNewsStatus = "loading";
      });
  },
});

export const { setLatestNewsList, setLatestNewsArticleSet, setLatestNewsArticle } = latestNews.actions;
export default latestNews.reducer;
