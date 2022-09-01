import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from './slices/podcastSlice';

const store = configureStore({
  reducer: {
    entries: podcastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
