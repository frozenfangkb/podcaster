import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PodcastEpisode } from "../models/Podcast";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLoading } from "../store/slices/loadingSlice";
import { getPodcast } from "../services/api/itunes/itunesService";
import { Entry } from "../models/ITunesResponse";
import { selectEntries } from "../store/slices/podcastSlice";

export const PodcastPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const entries = useAppSelector(selectEntries);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>([]);
  const currentPodcast = useMemo<Entry>(() => {
    return (
      entries.find(
        (entry) => entry.id.attributes["im:id"] === params.podcastId!.toString()
      ) || ({} as Entry)
    );
  }, [params]);

  useEffect(() => {
    loadPodcastData();
  }, []);

  const loadPodcastData = async () => {
    dispatch(setLoading(true));
    const podcastEpisodes: PodcastEpisode[] | null = await getPodcast(
      params.podcastId!
    );
    if (!podcastEpisodes) {
      console.error("Couldn't retrieve podcast");
      dispatch(setLoading(false));
      return;
    }
    setPodcasts(podcastEpisodes);
    dispatch(setLoading(false));
  };

  return (
    <div className="gridContainer">
      <div className="bg-white p-8 rounded-md flex flex-col gap-4 shadow-xl col-span-3">
        <div className="flex items-center justify-center pb-4 border-b border-b-gray-200">
          <img
            className="w-72 rounded-md"
            src={podcasts.length > 0 ? podcasts[0].artworkUrl600 : ""}
            alt={currentPodcast["im:name"].label}
          />
        </div>
        <div className="flex flex-col gap-2 pb-4 border-b border-b-gray-200">
          <span className="font-bold">{currentPodcast["im:name"].label}</span>
          <span className="italic">by {currentPodcast["im:artist"].label}</span>
        </div>
        <div>
          <span className="font-bold">Description:</span>
          <span className="italic">{currentPodcast.summary.label}</span>
        </div>
      </div>
    </div>
  );
};
