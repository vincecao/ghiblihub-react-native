import React, {ReactElement} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PhotoCard from './PhotoCard';
import {ParamList} from '../types';
import DetailPageIMDBLogo from './DetailPageIMDBLogo';
import DetailPageRatings from './DetailPageRatings';

export default function DetailsPage({
  route,
  navigation: {navigate},
}: NativeStackScreenProps<ParamList, 'DetailsPage'>): ReactElement {
  let {aniData, omdbData, tmdbData} = route.params;
  return (
    <ScrollView style={styles.ScrollView}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}>
        <ImageBackground
          style={styles.HeadImageBg}
          blurRadius={Platform.OS === 'ios' ? 10 : 5}
          source={{uri: aniData.bannerImage}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10,
              flex: 1,
            }}>
            <Image style={styles.HeadImage} source={{uri: omdbData.Poster}} />
            <View
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-start',
              }}>
              <Text style={styles.HeaderTitle}>{aniData.title.english}</Text>
              <Text style={styles.HeaderTitleOrigin}>
                {aniData.title.native}
              </Text>
            </View>
          </View>

          <View style={styles.HeadView}>
            <Text style={styles.HeaderInfoLabel}>Description</Text>
            <View style={{height: 50}}>
              <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={true}>
                <Text style={styles.HeaderInfoTxt}>{aniData.description}</Text>
              </ScrollView>
            </View>
            <Text style={styles.HeaderInfoLabel}>Director</Text>
            <Text style={styles.HeaderInfoTxt}>{omdbData.Director}</Text>
            <Text style={styles.HeaderInfoLabel}>Writer</Text>
            <Text style={styles.HeaderInfoTxt}>{omdbData.Writer}</Text>
            <Text style={styles.HeaderInfoLabel}>Release Date</Text>
            <Text style={styles.HeaderInfoTxt}>{aniData.startDate.year}</Text>
          </View>
          {omdbData.imdbID && (
            <DetailPageIMDBLogo
              onPress={() =>
                navigate('WebPage', {
                  uri: `https://www.imdb.com/title/${omdbData.imdbID}`,
                })
              }
            />
          )}
        </ImageBackground>
      </LinearGradient>

      <View style={{width: Dimensions.get('window').width}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <PhotoCard
            imageSources={[
              tmdbData.movie_results[0].poster_path,
              aniData.bannerImage,
              tmdbData.movie_results[0].backdrop_path,
              omdbData.Poster,
              aniData.coverImage.extraLarge,
            ]}
          />
        </ScrollView>
      </View>

      <View style={styles.BottomView}>
        <Text style={styles.InfoLabel}>Rating</Text>
        <DetailPageRatings ratings={omdbData.Ratings} />
        <Text style={styles.InfoLabel}>Website</Text>
        <Text style={styles.InfoTxt}>{omdbData.Website}</Text>
        <Text style={styles.InfoLabel}>Genre</Text>
        <Text style={styles.InfoTxt}>{omdbData.Genre}</Text>
        <Text style={styles.InfoLabel}>Writer</Text>
        <Text style={styles.InfoTxt}>{omdbData.Writer}</Text>
        <Text style={styles.InfoLabel}>Actors</Text>
        <Text style={styles.InfoTxt}>{omdbData.Actors}</Text>
        <Text style={styles.InfoLabel}>Language</Text>
        <Text style={styles.InfoTxt}>{omdbData.Language}</Text>
        <Text style={styles.InfoLabel}>Country</Text>
        <Text style={styles.InfoTxt}>{omdbData.Country}</Text>
        <Text style={styles.InfoLabel}>Awards</Text>
        <Text style={styles.InfoTxt}>{omdbData.Awards}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  HeadImageBg: {
    display: 'flex',
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-around',
    borderRadius: 15,
  },
  HeadImage: {
    height: 200,
    width: 150,
    borderRadius: 15,
  },
  HeaderTitle: {
    fontSize: 35,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'white',
    marginVertical: 5,
  },
  HeaderTitleOrigin: {
    fontSize: 22,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'white',
    marginVertical: 5,
  },
  HeadView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  HeaderInfoLabel: {
    fontWeight: '600',
    fontSize: 18,
    paddingVertical: 3,
    marginTop: 10,
    color: 'white',
  },
  HeaderInfoTxt: {
    color: 'white',
  },
  InfoLabel: {
    fontWeight: '600',
    fontSize: 18,
    paddingVertical: 8,
    marginTop: 10,
  },
  InfoTxt: {
    paddingLeft: 20,
  },
  BottomView: {
    padding: 20,
    flex: 1,
  },
});
