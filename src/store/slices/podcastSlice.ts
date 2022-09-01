import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { Entry } from '../../models/ITunesResponse';

export interface PodcastState {
  entries: Entry[],
}

const initialState: PodcastState = { entries: []};

export const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<Entry[]>) => {
      state.entries = action.payload;
    },
  },
});

export const { setEntries } = podcastSlice.actions;

export const selectEntries = (state: RootState) => state.entries.entries;

export default podcastSlice.reducer;
