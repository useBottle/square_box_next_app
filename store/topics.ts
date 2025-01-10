import { articleData, articlesWithKeyword, newsList, TopicsListType, TopicsType } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// 뉴스 리스트의 각 뉴스 개별 데이터 요청 미들웨어
export const fetchArticlesOfTopic = createAsyncThunk<articlesWithKeyword, { urls: string[]; keyword: string }>(
  "data/fetchArticlesOfTopic",
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

interface TopicsStatesType {
  topicsList: TopicsType[] | undefined;
  newsListsOfTopics: TopicsListType[] | undefined;
  newsListOfSingleTopic: {
    keyword: string;
    newsList: newsList[];
  };
  urlsOfNewsList: string[];
  articlesStates: "idle" | "loading" | "succeeded" | "failed";
  articlesOfSingleTopic: {
    keyword: string;
    articles: articleData[];
  };
}

const initialState: TopicsStatesType = {
  topicsList: undefined,
  newsListsOfTopics: undefined,
  newsListOfSingleTopic: {
    keyword: "",
    newsList: [],
  },
  urlsOfNewsList: [],
  articlesStates: "idle",
  articlesOfSingleTopic: {
    keyword: "",
    articles: [],
  },
};

export const topics = createSlice({
  name: "topics",
  initialState,
  reducers: {
    setTopicsList(state, action: PayloadAction<TopicsType[]>) {
      state.topicsList = action.payload;
    },
    setNewsListsOfTopics(state, action: PayloadAction<TopicsListType[]>) {
      state.newsListsOfTopics = action.payload;
    },
    setUrlsOfNewsList(state, action: PayloadAction<string[]>) {
      state.urlsOfNewsList = action.payload;
    },
    setNewsListOfSingleTopic(state, action: PayloadAction<{ keyword: string; newsList: newsList[] }>) {
      state.newsListOfSingleTopic = action.payload;
    },
    setArticlesOfSingleTopic(state, action: PayloadAction<{ keyword: string; articles: articleData[] }>) {
      state.articlesOfSingleTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesOfTopic.fulfilled, (state, action: PayloadAction<articlesWithKeyword>) => {
        state.articlesOfSingleTopic = action.payload;
      })
      .addCase(fetchArticlesOfTopic.rejected, (state) => {
        state.articlesStates = "failed";
      })
      .addCase(fetchArticlesOfTopic.pending, (state) => {
        state.articlesStates = "loading";
      });
  },
});

export const {
  setTopicsList,
  setNewsListsOfTopics,
  setNewsListOfSingleTopic,
  setArticlesOfSingleTopic,
  setUrlsOfNewsList,
} = topics.actions;
export default topics.reducer;
