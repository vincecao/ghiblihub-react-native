import {useCallback, useMemo} from 'react';
import axios from 'axios';
import {UsePromiseState, usePromiseState} from '@vincecao/use-tools';
import {OMDB_API_KEY} from 'react-native-dotenv';

const OMDB_URL = 'https://www.omdbapi.com';

export type Rating = {Source: string; Value: string};

export type OmdbResponse = {
  Poster: string | undefined;
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
    .then(response => {
      if (response.data.Poster === 'N/A') {
        // if poster is 'N/A' assign undefined
        response.data.Poster = undefined;
      }
      return response.data;
    });
}

export default function useOmdb(title: string): UsePromiseState<OmdbResponse> {
  return usePromiseState(
    useCallback(() => fetchOmdb(title), [title]),
    useMemo(() => ({deps: [title]}), [title]),
  );
}
