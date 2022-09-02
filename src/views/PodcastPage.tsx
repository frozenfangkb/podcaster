import React, { useEffect, useState, useMemo } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { PodcastEpisode } from "../models/Podcast";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLoading } from "../store/slices/loadingSlice";
import { getPodcast } from "../services/api/itunes/itunesService";
import { Entry } from "../models/ITunesResponse";
import { selectEntries } from "../store/slices/podcastSlice";
import { loadEntries } from "../services/entries/entries.service";
import { PodcastEpisodesList } from "../components/PodcastEpisodesList";
import { getHoursDifference } from "../util/getHoursDifference";
import { PodcastEpisodeCard } from "../components/PodcastEpisodeCard";

export const PodcastPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const entries = useAppSelector(selectEntries);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>([]);
  const [currentPodcast, setCurrentPodcast] = useState<Entry>({} as Entry);

  useEffect(() => {
    loadPodcastData();
  }, []);

  useEffect(() => {
    setCurrentPodcast(
      entries.find(
        (entry) => entry.id.attributes["im:id"] === params.podcastId!.toString()
      ) || ({} as Entry)
    );
  }, [entries]);

  const loadPodcastData = async () => {
    dispatch(setLoading(true));

    if (entries.length === 0) {
      await loadEntries();
    }

    const localPodcast = localStorage.getItem(params.podcastId!);
    const localPodcastLastUpdated = localStorage.getItem(
      `${params.podcastId!}-lastUpdated`
    );

    if (localPodcast && localPodcastLastUpdated) {
      /*
       * Calculate time difference in hours when last updated the local storage podcast.
       * If more than 24 hours passed, we reload the podcast.
       */
      getHoursDifference(new Date(localPodcastLastUpdated), new Date()) > 24
        ? await reloadPodcastData()
        : setPodcasts(JSON.parse(localPodcast));
    } else {
      await reloadPodcastData();
    }
    dispatch(setLoading(false));
  };

  const reloadPodcastData = async () => {
    const podcastEpisodes: PodcastEpisode[] | null = await getPodcast(
      params.podcastId!
    );
    if (!podcastEpisodes) {
      console.error("Couldn't retrieve podcast");
      dispatch(setLoading(false));
      return;
    }
    setPodcasts(podcastEpisodes);
    localStorage.setItem(params.podcastId!, JSON.stringify(podcastEpisodes));
    localStorage.setItem(
      `${params.podcastId!}-lastUpdated`,
      new Date().toISOString()
    );
  };

  return (
    <div className="gridContainer">
      <div className="card flex flex-col gap-4 col-span-3 h-min">
        <div className="flex items-center justify-center pb-4 border-b-2 border-b-gray-200">
          <Link to={`/podcast/${params.podcastId!}`}>
            <img
              className="w-72 rounded-md cursor-pointer"
              src={podcasts.length > 0 ? podcasts[0].artworkUrl600 : ""}
              alt={currentPodcast["im:name"]?.label}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-2 pb-4 border-b-2 border-b-gray-200">
          <Link to={`/podcast/${params.podcastId!}`}>
            <span className="font-bold cursor-pointer">
              {currentPodcast["im:name"]?.label}
            </span>
          </Link>
          <Link to={`/podcast/${params.podcastId!}`}>
            <span className="italic cursor-pointer">
              by {currentPodcast["im:artist"]?.label}
            </span>
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">Description:</span>
          <span className="italic">{currentPodcast.summary?.label}</span>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<PodcastEpisodesList list={podcasts} />} />
        <Route
          path="episode/:episodeId"
          element={<PodcastEpisodeCard list={podcasts} />}
        />
      </Routes>
    </div>
  );
};
