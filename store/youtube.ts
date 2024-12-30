import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface youtubeType {
  youtubueList: any[];
}

const initialState: youtubeType = {
  youtubueList: [],
};

export const youtube = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    setYoutubeList(state, action: PayloadAction<any>) {
      state.youtubueList = action.payload;
    },
  },
});

export const { setYoutubeList } = youtube.actions;
export default youtube.reducer;
