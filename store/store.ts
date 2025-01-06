import { configureStore } from "@reduxjs/toolkit";
import switchesReducer from "../store/switches";
import newsReducer from "../store/news";
import latestNewsReducer from "../store/latestNews";
import youtubeReducer from "../store/youtube";

const store = configureStore({
  reducer: {
    switches: switchesReducer,
    news: newsReducer,
    latestNews: latestNewsReducer,
    youtube: youtubeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
