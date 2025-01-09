import { LatestNewsArticle, newsList } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface LatestNewsType {
  latestNewsList: newsList[];
  latestArticleSet: LatestNewsArticle[];
  latestArticle: LatestNewsArticle;
}

const initialState: LatestNewsType = {
  latestNewsList: [],
  latestArticleSet: [],
  latestArticle: {
    title: "",
    date: "",
    image: "",
    alt: "",
    text: [],
  },
};

export const latestNews = createSlice({
  name: "latestNews",
  initialState,
  reducers: {
    setLatestNewsList(state, action) {
      state.latestNewsList = action.payload;
    },
    setLatestArticleSet(state, action) {
      state.latestArticleSet = action.payload;
    },
    setLatestArticle(state, action) {
      state.latestArticle = action.payload;
    },
  },
});

export const { setLatestNewsList, setLatestArticleSet, setLatestArticle } = latestNews.actions;
export default latestNews.reducer;
