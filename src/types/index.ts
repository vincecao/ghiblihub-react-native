import {AnilistData} from '../hooks/useAnilist';
import {OmdbResponse} from '../hooks/useOmdb';
import {TmdbResponse} from '../hooks/useTmdb';

export type ParamList = {
  GhibliHub: undefined;
  DetailPage: {
    aniData: AnilistData;
    omdbData: OmdbResponse;
    tmdbData: TmdbResponse;
  };
  WebPage: {
    uri: string;
  };
};
