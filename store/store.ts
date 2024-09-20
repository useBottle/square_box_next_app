import { configureStore } from "@reduxjs/toolkit";
import switchesReducer from "../store/switches";

const store = configureStore({
  reducer: {
    switches: switchesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
