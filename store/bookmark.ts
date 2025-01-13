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
  },
});

export const { setMarkedNews, setMarkedYoutube } = bookmark.actions;
export default bookmark.reducer;
