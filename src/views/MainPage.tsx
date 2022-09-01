import React, { useEffect, useMemo, useState } from "react";
import { Entry, ITunesResponse } from "../models/ITunesResponse";
import { PodcastCard } from "../components/PodcastCard";
import { selectEntries, setEntries } from "../store/slices/podcastSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPodcastList } from "../services/api/itunes/itunesService";
import { setLoading } from "../store/slices/loadingSlice";
import { getHoursDifference } from "../util/getHoursDifference";

export const MainPage: React.FC = () => {
  const entries = useAppSelector(selectEntries);
  const dispatch = useAppDispatch();
  const [filterValue, setFilterValue] = useState<string>("");
  const filteredEntries = useMemo<Entry[]>(() => {
    if (filterValue !== "") {
      return entries.filter(
        (entry) =>
          entry["im:name"].label
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          entry["im:artist"].label
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }
    return entries;
  }, [filterValue, entries]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    dispatch(setLoading(true));
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
        : dispatch(setEntries(localEntries ?? []));
    } else {
      await reloadEntries();
    }
    dispatch(setLoading(false));
  };

  const reloadEntries = async () => {
    const list: ITunesResponse = await getPodcastList();
    dispatch(setEntries(list.feed.entry ?? []));
    localStorage.setItem("lastUpdated", list.feed.updated.label);
    localStorage.setItem("entries", JSON.stringify(list.feed.entry));
  };

  return (
    <div>
      <div className="mainContainer">
        <div className="flex justify-end items-center gap-4">
          <span className="chipCounter">{filteredEntries.length}</span>
          <input
            className="w-96"
            type="text"
            placeholder="Filter podcasts..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-32">
          {filteredEntries.map((entry: Entry) => (
            <PodcastCard
              title={entry["im:name"].label}
              author={entry["im:artist"].label}
              image={entry["im:image"][2].label ?? ""}
              key={entry.id.attributes["im:id"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
