import { Entry, ITunesResponse } from "../../models/ITunesResponse";
import { setLoading } from "../../store/slices/loadingSlice";
import { setEntries } from "../../store/slices/podcastSlice";
import { getHoursDifference } from "../../util/getHoursDifference";
import { getPodcastList } from "../api/itunes/itunesService";
import store from "../../store";

export const loadEntries = async () => {
  store.dispatch(setLoading(true));
  const localEntries: Entry[] | null = localStorage.getItem("entries")
    ? JSON.parse(localStorage.getItem("entries")!)
    : null;

  if (localEntries && localStorage.getItem("lastUpdated")) {
    /*
     * Calculate time difference in hours when last updated the local storage entries.
     * If more than 24 hours passed, we reload the entries.
     */
    getHoursDifference(
      new Date(localStorage.getItem("lastUpdated")!),
      new Date()
    ) > 24
      ? await reloadEntries()
      : store.dispatch(setEntries(localEntries ?? []));
  } else {
    await reloadEntries();
  }
  store.dispatch(setLoading(false));
};

export const reloadEntries = async () => {
  const list: ITunesResponse = await getPodcastList();
  store.dispatch(setEntries(list.feed.entry ?? []));
  localStorage.setItem("lastUpdated", list.feed.updated.label);
  localStorage.setItem("entries", JSON.stringify(list.feed.entry));
};
