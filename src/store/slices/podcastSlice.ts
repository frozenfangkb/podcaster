import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { Entry } from '../../models/ITunesResponse';

export interface PodcastState {
  entries: Entry[],
  lastUpdated: Date | null
}

const initialState: PodcastState = { entries: [], lastUpdated: null };

export const podcastSlice = createSlice({
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

export const { setEntries, setLastUpdated } = podcastSlice.actions;

export const selectEntries = (state: RootState) => state.entries.entries;

export default podcastSlice.reducer;
