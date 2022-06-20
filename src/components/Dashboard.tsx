import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList} from 'react-native';
import useAnilist from '../hooks/useAnilist';
import {OmdbResponse} from '../hooks/useOmdb';
import {TmdbResponse} from '../hooks/useTmdb';
import {ParamList} from '../types';
import DashBoardCard from './DashBoardCard';

export default function Dashboard({
  navigation: {navigate},
}: NativeStackScreenProps<ParamList, 'GhibliHub'>) {
  const [anilistData] = useAnilist();
  return (
    <FlatList
      data={anilistData}
      renderItem={({item: aniData, index}) => (
        <DashBoardCard
          aniData={aniData}
          index={index}
          onSelected={(omdbData: OmdbResponse, tmdbData: TmdbResponse) => {
            navigate('DetailsPage', {aniData, omdbData, tmdbData});
          }}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}
