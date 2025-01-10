import { articleData, newsList, TopicsListType, TopicsType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicsStatesType {
  topicsList: TopicsType[] | undefined;
  newsListsOfTopics: TopicsListType[] | undefined;
  newsListOfSingleTopic: {
    keyword: string;
    newsList: newsList[];
  };
  articlesOfTopics: { keyword: string; articles: articleData[] }[] | undefined;
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
  articlesOfTopics: undefined,
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
    setArticlesOfTopics(state, action: PayloadAction<{ keyword: string; articles: articleData[] }[]>) {
      state.articlesOfTopics = action.payload;
    },
    setNewsListOfSingleTopic(state, action: PayloadAction<{ keyword: string; newsList: newsList[] }>) {
      state.newsListOfSingleTopic = action.payload;
    },
    setArticlesOfSingleTopic(state, action: PayloadAction<{ keyword: string; articles: articleData[] }>) {
      state.articlesOfSingleTopic = action.payload;
    },
  },
});

export const {
  setTopicsList,
  setNewsListsOfTopics,
  setArticlesOfTopics,
  setNewsListOfSingleTopic,
  setArticlesOfSingleTopic,
} = topics.actions;
export default topics.reducer;
