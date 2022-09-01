export interface ITunesResponse {
    feed: Feed;
}

export interface Feed {
    author:  Author;
    entry:   Entry[];
    updated: LabeledString;
    rights:  LabeledString;
    title:   LabeledString;
    LabeledString:    LabeledString;
    link:    Link[];
    id:      LabeledString;
}

export interface Author {
    name: LabeledString;
    uri:  LabeledString;
}

export interface LabeledString {
    label: string;
}

export interface Entry {
    "im:name":        LabeledString;
    "im:price":       IMPrice;
    "im:image":       IMImage[];
    summary:          LabeledString;
    "im:artist":      IMArtist;
    title:            LabeledString;
    link:             Link;
    id:               ID;
    "im:contentType": IMContentType;
    category:         Category;
    "im:releaseDate": IMReleaseDate;
    rights?:          LabeledString;
}

export interface Category {
    attributes: CategoryAttributes;
}

export interface CategoryAttributes {
    "im:id": string;
    term:    PurpleLabel;
    scheme:  string;
    label:   PurpleLabel;
}

export enum PurpleLabel {
    Music = "Music",
    MusicCommentary = "Music Commentary",
    MusicHistory = "Music History",
    MusicInterviews = "Music Interviews",
}

export interface ID {
    label:      string;
    attributes: IDAttributes;
}

export interface IDAttributes {
    "im:id": string;
}

export interface IMArtist {
    label:       string;
    attributes?: IMArtistAttributes;
}

export interface IMArtistAttributes {
    href: string;
}

export interface IMContentType {
    attributes: IMContentTypeAttributes;
}

export interface IMContentTypeAttributes {
    term:  FluffyLabel;
    label: FluffyLabel;
}

export enum FluffyLabel {
    Podcast = "Podcast",
}

export interface IMImage {
    label:      string;
    attributes: IMImageAttributes;
}

export interface IMImageAttributes {
    height: string;
}

export interface IMPrice {
    label:      IMPriceLabel;
    attributes: IMPriceAttributes;
}

export interface IMPriceAttributes {
    amount:   string;
    currency: Currency;
}

export enum Currency {
    Usd = "USD",
}

export enum IMPriceLabel {
    Get = "Get",
}

export interface IMReleaseDate {
    label:      Date;
    attributes: LabeledString;
}

export interface Link {
    attributes: LinkAttributes;
}

export interface LinkAttributes {
    rel:   Rel;
    type?: Type;
    href:  string;
}

export enum Rel {
    Alternate = "alternate",
    Self = "self",
}

export enum Type {
    TextHTML = "text/html",
}
