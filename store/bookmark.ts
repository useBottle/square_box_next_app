import { bookmarkSlice, markedNews, MarkedNewsArticle, markedYoutube, MarkedYoutubeVideo } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: bookmarkSlice = {
  markedNews: {
    exists: false,
    number: 0,
    data: [],
  },
  markedYoutube: {
    exists: false,
    number: 0,
    data: [],
  },
  clickedNews: {
    title: "",
    date: "",
    image: "",
    alt: "",
    text: [],
    username: "",
    createdAt: "",
    category: "",
    _id: "",
  },
  clickedYoutube: {
    videoId: "",
    title: "",
    channelTitle: "",
    publishedAt: "",
    description: "",
    thumbnail: "",
    username: "",
    createdAt: "",
    category: "",
    _id: "",
  },
};

export const bookmark = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setMarkedNews: (state, action: PayloadAction<markedNews>) => {
      state.markedNews = action.payload;
    },
    setMarkedYoutube: (state, action: PayloadAction<markedYoutube>) => {
      state.markedYoutube = action.payload;
    },
    setClickedNews: (state, action: PayloadAction<MarkedNewsArticle>) => {
      state.clickedNews = action.payload;
    },
    setClickedYoutube: (state, action: PayloadAction<MarkedYoutubeVideo>) => {
      state.clickedYoutube = action.payload;
    },
  },
});

export const { setMarkedNews, setMarkedYoutube, setClickedNews, setClickedYoutube } = bookmark.actions;
export default bookmark.reducer;
