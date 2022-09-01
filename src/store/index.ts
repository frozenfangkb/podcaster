import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from './slices/podcastSlice';
import loadingReducer from './slices/loadingSlice';

const store = configureStore({
  reducer: {
    entries: podcastReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
