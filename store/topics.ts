import { TopicsListType, TopicsType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicsStatesType {
  topicsList: TopicsType[] | undefined;
  newsListOfTopics: TopicsListType[] | undefined;
}

const initialState: TopicsStatesType = {
  topicsList: undefined,
  newsListOfTopics: undefined,
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
  },
});

export const { setTopicsList, setNewsListOfTopics } = topics.actions;
export default topics.reducer;
