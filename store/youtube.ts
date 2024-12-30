import { youtubeList } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchYoutube = createAsyncThunk<any, string>("data/fetchYoutube", async (inputValue: string) => {
  try {
    if (inputValue === "") return [];

    const response = await axios.post("/api/youtube", { inputValue: inputValue });
    const result = response.data.youtubeList;
    return result;
  } catch (error) {
    console.error("Youtube fetch failed on middleware.", error);
    return [];
  }
});

interface youtubeType {
  youtubueList: youtubeList[];
}

const initialState: youtubeType = {
  youtubueList: [],
};

export const youtube = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    setYoutubeList(state, action: PayloadAction<youtubeList[]>) {
      state.youtubueList = action.payload;
    },
  },
});

export const { setYoutubeList } = youtube.actions;
export default youtube.reducer;
