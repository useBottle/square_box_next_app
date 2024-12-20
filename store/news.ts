import { articleData, newsList, PopularArticle } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// 인기 뉴스 개별 데이터 요청 미들웨어
export const fetchPopular = createAsyncThunk<PopularArticle, string>("data/fetchPopular", async (url: string) => {
  try {
    const requestArticles = await axios.post("/api/popular", { url: url });
    console.log(requestArticles.data.popularData);
    return requestArticles.data.popularData;
  } catch (error) {
    console.error(error);
    return {
      title: "",
      image: "",
      date: "",
      text: [],
    };
  }
});

// 뉴스 전체 데이터 요청 미들웨어
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

// 뉴스 개별 데이터 요청 미들웨어
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
  popular: PopularArticle;
  newsList: newsList[];
  article: articleData[];
  urls: string[];
  access: boolean;
  popularStatus: "idle" | "loading" | "succeeded" | "failed";
  newsStatus: "idle" | "loading" | "succeeded" | "failed";
  articleStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: newsType = {
  popular: {
    title: "",
    image: "",
    date: "",
    text: [],
  },
  newsList: [],
  article: [],
  urls: [],
  access: false,
  popularStatus: "idle",
  newsStatus: "idle",
  articleStatus: "idle",
};

export const news = createSlice({
  name: "news",
  initialState,
  reducers: {
    setPopularArticle(state, action: PayloadAction<PopularArticle>) {
      state.popular = action.payload;
    },
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

      // 인기 뉴스 개별 데이터 요청 수행 결과 처리
      .addCase(fetchPopular.pending, (state) => {
        state.popularStatus = "loading";
      })
      .addCase(fetchPopular.fulfilled, (state, action: PayloadAction<PopularArticle | undefined>) => {
        state.popularStatus = "succeeded";
        if (action.payload) {
          state.popular = action.payload;
        }
      })
      .addCase(fetchPopular.rejected, (state) => {
        state.popularStatus = "failed";
      })

      // 뉴스 전체 데이터 요청 수행 결과 처리
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

      // 뉴스 개별 데이터 요청 수행 결과 처리
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

export const { setPopularArticle, setNews, setArticles, setNewsAccess } = news.actions;
export default news.reducer;
