import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Podcast } from "../models/Podcast";
import { useAppDispatch } from "../store/hooks";
import { setLoading } from "../store/slices/loadingSlice";
import { getPodcast } from "../services/api/itunes/itunesService";

export const PodcastPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [podcast, setPodcast] = useState<Podcast>();

  useEffect(() => {
    loadPodcastData();
  }, []);

  const loadPodcastData = async () => {
    dispatch(setLoading(true));
    const podcast: Podcast | null = await getPodcast(params.podcastId!);
    if (!podcast) {
      console.error("Couldn't retrieve podcast");
      dispatch(setLoading(false));
      return;
    }
    setPodcast(podcast);
    dispatch(setLoading(false));
  };

  return (
    <div className="mainContainer flex-row gap-12">
      podcast id is {podcast?.trackId}
    </div>
  );
};
