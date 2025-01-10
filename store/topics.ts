import { newsList, TopicsListType, TopicsType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicsStatesType {
  topicsList: TopicsType[] | undefined;
  newsListsOfTopics: TopicsListType[] | undefined;
  newsListOfSingleTopic: {
    keyword: string;
    newsList: newsList[];
  };
  urlsOfNewsList: string[];
}

const initialState: TopicsStatesType = {
  topicsList: undefined,
  newsListsOfTopics: undefined,
  newsListOfSingleTopic: {
    keyword: "",
    newsList: [],
  },
  urlsOfNewsList: [],
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
  },
});

export const { setTopicsList, setNewsListsOfTopics, setNewsListOfSingleTopic, setUrlsOfNewsList } = topics.actions;
export default topics.reducer;
