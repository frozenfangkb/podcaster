import React from "react";
import classes from "./podcastCard.module.css";

interface Props {
  title: string;
  author: string;
  image: string;
}

export const PodcastCard: React.FC<Props> = (props: Props) => {
  const { title, author, image } = props;

  return (
    <div className={classes.card}>
      <img className={classes.cardImage} src={image} alt={title} />
      <p className={classes.cardTitle}>{title}</p>
      <span className={classes.cardAuthor}>Author: {author}</span>
    </div>
  );
};
