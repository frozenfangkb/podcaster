import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { getPodcastList } from "../services/api/itunes/itunesService";
import { Entry, ITunesResponse } from "../models/ITunesResponse";
import { PodcastCard } from "../components/PodcastCard";

export const MainPage: React.FC = () => {
  const [podcastList, setPodcasList] = useState<Entry[]>([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const list: ITunesResponse = await getPodcastList();
    setPodcasList(list.feed.entry ?? []);
  };

  return (
    <div>
      <Header />
      <div className="mainContainer">
        <div className="grid grid-cols-4 gap-x-4 gap-y-32">
          {podcastList.map((entry: Entry) => (
            <PodcastCard
              title={entry["im:name"].label}
              author={entry["im:artist"].label}
              image={entry["im:image"][2].label ?? ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
