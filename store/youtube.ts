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
  youtubeList: youtubeList[];
  youtubeStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: youtubeType = {
  youtubeList: [],
  youtubeStatus: "idle",
};

export const youtube = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    setYoutubeList(state, action: PayloadAction<youtubeList[]>) {
      state.youtubeList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchYoutube.fulfilled, (state, action: PayloadAction<youtubeList[]>) => {
        state.youtubeStatus = "succeeded";
        if (action.payload) {
          state.youtubeList = action.payload;
        }
      })
      .addCase(fetchYoutube.rejected, (state) => {
        state.youtubeStatus = "failed";
      })
      .addCase(fetchYoutube.pending, (state) => {
        state.youtubeStatus = "loading";
      });
  },
});

export const { setYoutubeList } = youtube.actions;
export default youtube.reducer;