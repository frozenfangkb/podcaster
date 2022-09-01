export interface PodcastResponse {
  resultCount: number;
  results: PodcastEpisode[];
}

export interface PodcastEpisode {
  wrapperType: WrapperType;
  kind: Kind;
  artistId?: number;
  collectionId: number;
  trackId: number;
  artistName?: string;
  collectionName: Name;
  trackName: string;
  collectionCensoredName?: Name;
  trackCensoredName?: Name;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30?: string;
  artworkUrl60: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  trackRentalPrice?: number;
  collectionHdPrice?: number;
  trackHdPrice?: number;
  trackHdRentalPrice?: number;
  releaseDate: Date;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  trackCount?: number;
  country: Country;
  currency?: string;
  primaryGenreName?: PrimaryGenreNameEnum;
  contentAdvisoryRating: ContentAdvisoryRating;
  artworkUrl600: string;
  genreIds?: string[];
  genres: Array<GenreClass | string>;
  closedCaptioning?: ClosedCaptioning;
  artworkUrl160?: string;
  episodeContentType?: EpisodeContentType;
  episodeFileExtension?: EpisodeFileExtension;
  artistIds?: number[];
  episodeUrl?: string;
  previewUrl?: string;
  trackTimeMillis?: number;
  episodeGuid?: string;
  description?: string;
  shortDescription?: string;
}

export enum ClosedCaptioning {
  None = "none",
}

export enum Name {
  SelfHelpless = "Self-Helpless",
}

export enum ContentAdvisoryRating {
  Explicit = "Explicit",
}

export enum Country {
  Usa = "USA",
}

export enum EpisodeContentType {
  Audio = "audio",
}

export enum EpisodeFileExtension {
  Mp3 = "mp3",
}

export interface GenreClass {
  name: PrimaryGenreNameEnum;
  id: string;
}

export enum PrimaryGenreNameEnum {
  Comedy = "Comedy",
}

export enum Kind {
  Podcast = "podcast",
  PodcastEpisode = "podcast-episode",
}

export enum WrapperType {
  PodcastEpisode = "podcastEpisode",
  Track = "track",
}
