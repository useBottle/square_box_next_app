import { LatestNewsArticle, newsList } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface LatestNewsType {
  latestNewsList: newsList[] | undefined;
  latestNewsArticle: LatestNewsArticle;
  latestNewsUrl: string;
}

const initialState: LatestNewsType = {
  latestNewsList: undefined,
  latestNewsArticle: {
    title: "",
    date: "",
    image: "",
    alt: "",
    text: [],
  },
  latestNewsUrl: "",
};

export const latestNews = createSlice({
  name: "latestNews",
  initialState,
  reducers: {
    setLatestNewsList(state, action) {
      state.latestNewsList = action.payload;
    },
    setLatestNewsArticle(state, action) {
      state.latestNewsArticle = action.payload;
    },
    setLatestNewsUrl(state, action) {
      state.latestNewsUrl = action.payload;
    },
  },
});

export const { setLatestNewsList, setLatestNewsArticle, setLatestNewsUrl } = latestNews.actions;
export default latestNews.reducer;
