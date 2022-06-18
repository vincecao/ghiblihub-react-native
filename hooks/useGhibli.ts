import axios from 'axios';
import {usePromiseState} from '@vincecao/use-tools';

const GHIBLI_URL = 'https://ghibliapi.herokuapp.com/films';

type GhibliResponse = {
  length: number;
};

function fetchGhibli(): Promise<GhibliResponse> {
  return axios.get<GhibliResponse>(GHIBLI_URL).then(response => response.data);
}

export default function useGhibli(): [GhibliResponse | null] {
  const {data} = usePromiseState({
    promise: fetchGhibli,
  });
  return [data];
}
