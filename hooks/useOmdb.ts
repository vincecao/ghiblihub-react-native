import axios from 'axios';
import {usePromiseState} from '@vincecao/use-tools';
import {OMDB_API_KEY} from 'react-native-dotenv';

const OMDB_URL = 'http://www.omdbapi.com';

export type Rating = {Source: string; Value: string};

export type OmdbResponse = {
  Poster: string | 'N/A';
  Writer: string;
  imdbID: string;
  Genre: string;
  Actors: string;
  Country: string;
  Language: string;
  Awards: string;
  Director: string;
  Ratings: Rating[];
  Website: string;
  Runtime: string;
  Plot: string;
};

function fetchOmdb(title: string): Promise<OmdbResponse> {
  return axios
    .get<OmdbResponse>(OMDB_URL, {
      params: {
        apikey: OMDB_API_KEY,
        t: title,
      },
    })
    .then(response => response.data);
}

export default function useOmdb(title: string): [OmdbResponse | null] {
  const {data} = usePromiseState({
    promise: () => fetchOmdb(title || ''), // TODO: update library for falsy type cast
    deps: [title],
  });
  return [data];
}
