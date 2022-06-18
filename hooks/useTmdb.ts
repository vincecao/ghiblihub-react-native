import axios from 'axios';
import {usePromiseState} from '@vincecao/use-tools';
import {TMDB_API_KEY} from 'react-native-dotenv';

const TMDB_PREFIX_URL = 'https://api.themoviedb.org/3/find';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateTmdbImage(extend: string) {
  return [
    `https://image.tmdb.org/t/p/w500_and_h282_face${extend}`,
    `https://image.tmdb.org/t/p/w1280${extend}`,
  ];
}

type TmdbResponseResult = {
  backdrop_path: string;
  poster_path: string;
};

export type TmdbResponse = {
  success: boolean;
  movie_results: TmdbResponseResult[];
};

async function fetchTmdb(id: string | undefined): Promise<TmdbResponse> {
  if (!id) {
    throw new Error('missing id');
  }
  const items = await axios
    .get<TmdbResponse>(`${TMDB_PREFIX_URL}/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        external_source: 'imdb_id',
      },
    })
    .then(response => response.data);
  items.movie_results = items.movie_results.map(result => ({
    backdrop_path: generateTmdbImage(result.backdrop_path)[0],
    poster_path: generateTmdbImage(result.poster_path)[0],
  }));
  return items;
}

export default function useTmdb(id: string | undefined): [TmdbResponse | null] {
  const {data} = usePromiseState({
    promise: () => fetchTmdb(id),
    deps: [id],
  });
  return [data];
}
