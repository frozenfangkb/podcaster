import React, { useEffect, useState } from "react";
import { PodcastEpisode } from "../../models/Podcast";
import { useParams } from "react-router-dom";
import sanitizeHtml from "sanitize-html";

interface Props {
  list: PodcastEpisode[];
}

export const PodcastEpisodeCard: React.FC<Props> = (props: Props) => {
  const { list } = props;
  const params = useParams();
  const [episode, setEpisode] = useState<PodcastEpisode>();

  useEffect(() => {
    const ep = list.find((x) => x.trackId.toString() === params.episodeId!);
    console.log(ep);

    setEpisode(ep ?? ({} as PodcastEpisode));
  }, [list]);

  return (
    <div className="card flex flex-col gap-4 col-span-7 h-min">
      <h2>{episode?.trackName}</h2>
      <p
        className="italic"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(episode?.description ?? "No description"),
        }}
      ></p>
      <audio className="w-full mt-8" src={episode?.episodeUrl} controls />
    </div>
  );
};
