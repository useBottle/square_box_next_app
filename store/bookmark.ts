import { bookmarkSlice, MarkedNewsArticle, MarkedYoutubeVideo } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

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
};

export const bookmark = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
});

export const {} = bookmark.actions;
export default bookmark.reducer;
