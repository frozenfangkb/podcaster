import { ITunesResponse } from '../../../models/ITunesResponse';
import { api } from '../api';

export const getPodcastList = async (): Promise<ITunesResponse> => {
    return (await api.get('us/rss/toppodcasts/limit=100/genre=1310/json'))?.data ?? {} as ITunesResponse;
}
