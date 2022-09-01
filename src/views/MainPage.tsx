import React, { useEffect } from "react";
import { Entry, ITunesResponse } from "../models/ITunesResponse";
import { PodcastCard } from "../components/PodcastCard";
import {
  selectEntries,
  setEntries,
  setLastUpdated,
} from "../store/slices/podcastSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getPodcastList } from "../services/api/itunes/itunesService";
import { setLoading } from "../store/slices/loadingSlice";

export const MainPage: React.FC = () => {
  const entries = useAppSelector(selectEntries);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    dispatch(setLoading(true));
    const list: ITunesResponse = await getPodcastList();
    dispatch(setEntries(list.feed.entry ?? []));
    dispatch(setLastUpdated(new Date()));
    dispatch(setLoading(false));
  };

  return (
    <div>
      <div className="mainContainer">
        <div className="grid grid-cols-4 gap-x-4 gap-y-32">
          {entries.map((entry: Entry) => (
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
