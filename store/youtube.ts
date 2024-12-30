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

// 추후 타입 수정 필요
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
    // 추후 PayloadAction 타입 수정 필요
    setYoutubeList(state, action: PayloadAction<any>) {
      state.youtubueList = action.payload;
    },
  },
});

export const { setYoutubeList } = youtube.actions;
export default youtube.reducer;
