import { TopicsListType, TopicsType } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TopicsStatesType {
  topicsList: TopicsType[];
  newsListOfTopics: TopicsListType[];
}

const initialState: TopicsStatesType = {
  topicsList: [],
  newsListOfTopics: [],
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
