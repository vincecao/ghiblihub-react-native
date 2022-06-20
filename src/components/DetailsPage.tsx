import React, {ReactElement} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, ScrollView} from 'react-native';
import PhotoCards from './PhotoCards';
import {ParamList} from '../types';
import DetailsPageHeader from './DetailsPageHeader';
import DetailsPageBody from './DetailsPageBody';

export default function DetailsPage({
  route,
  navigation: {navigate},
}: NativeStackScreenProps<ParamList, 'DetailsPage'>): ReactElement {
  let {aniData, omdbData, tmdbData} = route.params;
  return (
    <ScrollView style={styles.scrollView}>
      <DetailsPageHeader
        backgroundSource={aniData.bannerImage}
        posterSource={omdbData.Poster || ''}
        title={{english: aniData.title.english, native: aniData.title.native}}
        labelSections={[
          ['Description', aniData.description],
          ['Director', omdbData.Director],
          ['Writer', omdbData.Writer],
          ['Release Date', aniData.startDate.year],
        ]}
        onPressIMDB={() =>
          navigate('WebPage', {
            uri: `https://www.imdb.com/title/${omdbData.imdbID}`,
          })
        }
      />
      <PhotoCards
        imageSources={[
          tmdbData.movie_results[0]?.poster_path,
          aniData.bannerImage,
          tmdbData.movie_results[0]?.backdrop_path,
          omdbData.Poster,
          aniData.coverImage.extraLarge,
        ]}
      />
      <DetailsPageBody
        bodySections={[
          ['Rating', omdbData.Ratings],
          ['Website', omdbData.Website],
          ['Genre', omdbData.Genre],
          ['Writer', omdbData.Writer],
          ['Actors', omdbData.Actors],
          ['Language', omdbData.Language],
          ['Country', omdbData.Country],
          ['Awards', omdbData.Awards],
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
});
