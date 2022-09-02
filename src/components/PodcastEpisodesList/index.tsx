import React from "react";
import { Link } from "react-router-dom";
import { PodcastEpisode } from "../../models/Podcast";
import { getDateString } from "../../util/getDateString";
import { millisecondsToMinutesAndSeconds } from "../../util/millisecondsToMinutesAndSeconds";

interface Props {
  list: PodcastEpisode[];
}

export const PodcastEpisodesList: React.FC<Props> = (props: Props) => {
  const { list } = props;

  return (
    <div className="col-span-7 flex flex-col gap-10">
      <div className="card">
        <h1>Episodes: {list.length}</h1>
      </div>
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th>Title</th>
              <th className="text-start">Date</th>
              <th className="text-start">Duration</th>
            </tr>
          </thead>
          <tbody>
            {list.map((episode, index) => (
              <tr
                key={episode.trackId}
                className={`h-12 border-b-2
                 border-gray-200 ${index % 2 !== 0 ? "bg-gray-100" : ""} `}
              >
                <td className="pl-2">
                  <Link
                    to={`episode/${episode.trackId}`}
                    className="cursor-pointer text-blue-500"
                  >
                    {episode.trackName}
                  </Link>
                </td>
                <td className="text-start">
                  {getDateString(new Date(episode.releaseDate))}
                </td>
                <td className="text-start">
                  {millisecondsToMinutesAndSeconds(
                    episode.trackTimeMillis ?? 0
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
