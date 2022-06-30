import {useCallback} from 'react';
import {UsePromiseState, usePromiseState} from '@vincecao/use-tools';
import axios from 'axios';

const QUERY = `query ($id: Int, $page: Int) {
    Studio(id:$id){
    name
    media(page: $page) {
      pageInfo {
        total
        lastPage
        currentPage
        hasNextPage
      }
      nodes {
        description
        title {
          romaji
          english
          native
        }
        format
        trailer {
          site
          thumbnail
        }
        startDate {
          year
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
        averageScore
      }
    }
  }
}
  `;

const VARIABLES_ID = 21;

const ANILIST_URL = 'https://graphql.anilist.co';

export type AnilistData = {
  description: string;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  format: string;
  trailer: string | null;
  startDate: {year: number};
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  bannerImage: string;
  averageScore: number;
};

type AnilistResponse = {
  data: {
    Studio: {
      media: {
        pageInfo: {
          hasNextPage: boolean;
        };
        nodes: AnilistData[];
      };
    };
  };
};

async function fetchAnilist(): Promise<AnilistData[]> {
  let page = 1;
  let hasNextPage = true;
  let totalData: AnilistData[] = [];
  do {
    const data = await axios
      .post<AnilistResponse>(ANILIST_URL, {
        query: QUERY,
        variables: {id: VARIABLES_ID, page},
      })
      .then(response => response.data);
    totalData = totalData.concat(data.data.Studio.media.nodes);
    hasNextPage = data.data.Studio.media.pageInfo.hasNextPage;
    page += 1;
  } while (hasNextPage);
  return totalData;
}

export default function useAnilist(): UsePromiseState<AnilistData[]> {
  return usePromiseState(useCallback(fetchAnilist, []));
}
