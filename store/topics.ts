import { articleData, TopicsListType, TopicsType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicsStatesType {
  topicsList: TopicsType[] | undefined;
  newsListOfTopics: TopicsListType[] | undefined;
  articlesOfTopics: { keyword: string; articles: articleData[] }[] | undefined;
}

const initialState: TopicsStatesType = {
  topicsList: undefined,
  newsListOfTopics: undefined,
  articlesOfTopics: undefined,
};

export const topics = createSlice({
  name: "topics",
  initialState,
  reducers: {
    setTopicsList(state, action: PayloadAction<TopicsType[]>) {
      state.topicsList = action.payload;
    },
    setNewsListOfTopics(state, action: PayloadAction<TopicsListType[]>) {
      state.newsListOfTopics = action.payload;
    },
    setTotalArticles(state, action: PayloadAction<{ keyword: string; articles: articleData[] }[]>) {
      state.articlesOfTopics = action.payload;
    },
  },
});

export const { setTopicsList, setNewsListOfTopics, setTotalArticles } = topics.actions;
export default topics.reducer;
