import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { Entry } from '../../models/ITunesResponse';

export interface PodcastState {
  entries: Entry[],
  lastUpdated: Date | null
}

const initialState: PodcastState = { entries: [], lastUpdated: null };

export const entrySlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<Entry[]>) => {
      state.entries = action.payload;
    },
    setLastUpdated: (state, action: PayloadAction<Date>) => {
        state.lastUpdated = action.payload;
      },
  },
});

export const { setEntries, setLastUpdated } = entrySlice.actions;

export const selectEntries = (state: RootState) => state.podcasts.entries;

export default entrySlice.reducer;
