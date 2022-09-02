import React from "react";
import { PodcastEpisode } from "../../models/Podcast";

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
      <div className="card"></div>
    </div>
  );
};
