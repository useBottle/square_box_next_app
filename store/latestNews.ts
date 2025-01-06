import { LatestNewsArticle, newsList } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as cheerio from "cheerio";

interface getLatestNewsType {
  newsTop10List: newsList[];
  urls: string[];
}

// 최신 뉴스 리스트 요청 미들웨어
export const getLatestNewsList = createAsyncThunk<getLatestNewsType>("data/getLatestNewsList", async () => {
  const url = process.env.LATEST_NEWS_API || "";

  try {
    // 최신 뉴스 리스트 preview 데이터 요청
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const list = $("ul.list li");
    const newsData: newsList[] = [];
    list.each((_, item) => {
      const title = $(item).find(".item-box01 .news-con a .tit-news").text().trim();
      const img = $(item).find(".item-box01 .img-con a img").attr("src");
      const href = $(item).find(".item-box01 .img-con a").attr("href");
      const date = $(item).find(".item-box01 .info-box01 .txt-time").text().trim();
      const summary = $(item).find(".item-box01 .news-con .lead").text().trim();

      const news = {
        title: title,
        href: href || "",
        prevImg: img || "",
        date: date,
        summary: summary,
      };
      newsData.push(news);
    });
    const imgExistNewsData = newsData.filter((item) => item.prevImg !== "");
    const textExistNewsData = imgExistNewsData.filter((item) => item.summary !== "");
    const newsTop10List = textExistNewsData.slice(0, 10);
    const urls = newsTop10List.map((item) => item.href);

    return { newsTop10List: newsTop10List, urls: urls };
  } catch (error) {
    console.error("Error fetching latest news", error);
    return { newsTop10List: [], urls: [] };
  }
});

// 최신 뉴스 url 로 각 개별 데이터 요청 미들웨어
export const getLatestNewsArticle = createAsyncThunk("data/getLatestNewsArticle", async (urls: string[]) => {
  try {
    const results = await Promise.all(
      urls.map(async (url) => {
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

        return {
          title: title,
          date: date || "",
          image: img || "",
          alt: alt || "",
          text: text,
        };
      }),
    );
    return results;
  } catch (error) {
    console.error("fetching latest news articles failed", error);
  }
});

interface LatestNewsType {
  latestNewsList: newsList[];
  latestNewsUrls: string[];
  latestArticleSet: LatestNewsArticle[];
  latestNewsStatus: "idle" | "loading" | "succeeded" | "failed";
  latestArticleStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: LatestNewsType = {
  latestNewsList: [],
  latestNewsUrls: [],
  latestArticleSet: [],
  latestNewsStatus: "idle",
  latestArticleStatus: "idle",
};

export const latestNews = createSlice({
  name: "latestNews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 최신 뉴스 리스트 요청 수행 결과 처리
      .addCase(getLatestNewsList.fulfilled, (state, action) => {
        state.latestNewsStatus = "succeeded";
        if (action.payload) {
          state.latestNewsList = action.payload.newsTop10List;
          state.latestNewsUrls = action.payload.urls;
        }
      })
      .addCase(getLatestNewsList.rejected, (state) => {
        state.latestNewsStatus = "failed";
      })
      .addCase(getLatestNewsList.pending, (state) => {
        state.latestNewsStatus = "loading";
      })

      // 최신 뉴스 url 로 각 개별 데이터 요청 수행 결과 처리
      .addCase(getLatestNewsArticle.fulfilled, (state, action) => {
        state.latestArticleStatus = "succeeded";
        if (action.payload) {
          state.latestArticleSet = action.payload;
        }
      })
      .addCase(getLatestNewsArticle.rejected, (state) => {
        state.latestArticleStatus = "failed";
      })
      .addCase(getLatestNewsArticle.pending, (state) => {
        state.latestArticleStatus = "loading";
      });
  },
});

export const {} = latestNews.actions;
export default latestNews.reducer;
