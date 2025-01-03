import { youtubeApiResult } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchYoutube = createAsyncThunk<youtubeApiResult, string>(
  "data/fetchYoutube",
  async (inputValue: string) => {
    try {
      if (inputValue === "") return {};

      const response = await axios.post("/api/youtube", { inputValue: inputValue });
      const result = response.data.youtubeData;
      return result;
    } catch (error) {
      console.error("Youtube fetch failed on middleware.", error);
      return {};
    }
  },
);

interface youtubeType {
  youtubeList: youtubeApiResult;
  youtubeStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: youtubeType = {
  youtubeList: {
    kind: "",
    etag: "",
    items: [],
    nextPageToken: "",
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
  },
  youtubeStatus: "idle",
};

export const youtube = createSlice({
  name: "youtube",
  initialState,
  reducers: {
    setYoutubeList(state, action: PayloadAction<youtubeApiResult>) {
      state.youtubeList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchYoutube.fulfilled, (state, action: PayloadAction<youtubeApiResult>) => {
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
