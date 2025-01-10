import { LatestNewsArticle, newsList } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface LatestNewsType {
  latestNewsList: newsList[];
  latestNewsArticleSet: LatestNewsArticle[];
  latestNewsArticle: LatestNewsArticle;
}

const initialState: LatestNewsType = {
  latestNewsList: [],
  latestNewsArticleSet: [],
  latestNewsArticle: {
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
    setLatestNewsArticleSet(state, action) {
      state.latestNewsArticleSet = action.payload;
    },
    setLatestNewsArticle(state, action) {
      state.latestNewsArticle = action.payload;
    },
  },
});

export const { setLatestNewsList, setLatestNewsArticleSet, setLatestNewsArticle } = latestNews.actions;
export default latestNews.reducer;
