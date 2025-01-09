import { LatestNewsArticle, newsList } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface LatestNewsType {
  latestNewsList: newsList[];
  latestArticleSet: LatestNewsArticle[];
  latestArticles: LatestNewsArticle;
}

const initialState: LatestNewsType = {
  latestNewsList: [],
  latestArticleSet: [],
  latestArticles: {
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
    setLatestArticles(state, action) {
      state.latestArticles = action.payload;
    },
  },
});

export const { setLatestNewsList, setLatestArticleSet, setLatestArticles } = latestNews.actions;
export default latestNews.reducer;
