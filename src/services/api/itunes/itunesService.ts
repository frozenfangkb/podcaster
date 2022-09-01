import axios from "axios";
import { ITunesResponse } from "../../../models/ITunesResponse";
import { PodcastEpisode, PodcastResponse } from "../../../models/Podcast";
import { api } from "../api";

export const getPodcastList = async (): Promise<ITunesResponse> => {
  return (
    (await api.get("us/rss/toppodcasts/limit=100/genre=1310/json"))?.data ??
    ({} as ITunesResponse)
  );
};

export const getPodcast = async (
  id: string
): Promise<PodcastEpisode[] | null> => {
  const url = `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`;
  const response = (
    await axios.get("https://api.allorigins.win/get", {
      params: { url },
    })
  ).data.contents;

  const parsedResponse: PodcastResponse = JSON.parse(response);

  if (parsedResponse.resultCount > 0) {
    return parsedResponse.results;
  }

  return null;
};
