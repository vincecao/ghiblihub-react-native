import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  Dimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import PhotoCard from '../parts/PhotoCard'

const loopRating = (item) => {
  return item.omdb.Ratings ? item.omdb.Ratings.map((rating, index) => <Text style={{ paddingLeft: 20, paddingVertical: 3 }} key={index + '-loop'}><Text style={{ fontWeight: '600', paddingLeft: 15 }} key={index + '-label'}>{rating.Source}: </Text><Text key={index + 'value'}>{rating.Value}</Text></Text>) : null
}

const returnPhotosOfMovie = (dataSet) => {
  return dataSet.map((data, index) => {
    return <PhotoCard item={data} key={index + '-photoCard-'} index={index} onSelected={() => { }} /> //TODO: onSelected Action
  })
}

const DetailsPage = ({ navigation }) => {
  let item = navigation.state.params.item
  const { navigate } = navigation
  let data = [item['tmdb']['backdrop_path'], item.omdb.Poster]
  if (item['photos'].length > 0)
    data = [...data, ...item['photos']]

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
      <ScrollView style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
        <View>
          <ImageBackground
            style={styles.HeadImageBg}
            blurRadius={Platform.OS == 'ios' ? 10 : 5}
            source={{ uri: item['tmdb']['backdrop_path'] }}>
            <View
              style={{ position: 'absolute', width: Dimensions.get('window').width, height: 500, flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}></View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, flex: 1 }}>
              <Image style={styles.HeadImage} source={{ uri: item.omdb.Poster }} />
              <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                <Text style={styles.HeaderTitle}>{item.title}</Text>
                <Text style={styles.HeaderTitleOrigin}>{item['tmdb']['original_title']}</Text>
              </View>
            </View>


            <View style={styles.HeadView}>
              <Text style={styles.HeaderInfoLabel}>Description</Text>
              <View style={{ height: 50 }}>
                <ScrollView horizontal={false} showsHorizontalScrollIndicator={true} >
                  <Text style={styles.HeaderInfoTxt}>{item.description}</Text>
                </ScrollView>
              </View>
              <Text style={styles.HeaderInfoLabel}>Director</Text>
              <Text style={styles.HeaderInfoTxt}>{item.director}</Text>
              <Text style={styles.HeaderInfoLabel}>Producer</Text>
              <Text style={styles.HeaderInfoTxt}>{item.producer}</Text>
              <Text style={styles.HeaderInfoLabel}>Release Date</Text>
              <Text style={styles.HeaderInfoTxt}>{item.release_date}</Text>
            </View>
            <TouchableOpacity onPress={(e) => navigate('WebPage', { uri: 'https://www.imdb.com/title/' + item.omdb.imdbID, })}>
              <Image style={{ position: 'absolute', right: 0, bottom: 0, width: 70, height: 40, resizeMode: 'contain', marginTop: 20 }} source={{ uri: 'https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png' }} />
            </TouchableOpacity>
          </ImageBackground>

          <View style={{ width: Dimensions.get('window').width }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {returnPhotosOfMovie(data)}
            </ScrollView>
          </View>

          <View style={styles.BottomView}>
            <Text style={styles.InfoLabel}>Rating</Text>
            {loopRating(item)}
            {/* <Text style={styles.InfoLabel}>Website</Text>
            <Text style={styles.InfoTxt}>{item.omdb.Website}</Text> */}
            <Text style={styles.InfoLabel}>Genre</Text>
            <Text style={styles.InfoTxt}>{item.omdb.Genre}</Text>
            <Text style={styles.InfoLabel}>Writer</Text>
            <Text style={styles.InfoTxt}>{item.omdb.Writer}</Text>
            <Text style={styles.InfoLabel}>Actors</Text>
            <Text style={styles.InfoTxt}>{item.omdb.Actors}</Text>
            <Text style={styles.InfoLabel}>Language</Text>
            <Text style={styles.InfoTxt}>{item.omdb.Language}</Text>
            <Text style={styles.InfoLabel}>Country</Text>
            <Text style={styles.InfoTxt}>{item.omdb.Country}</Text>
            <Text style={styles.InfoLabel}>Awards</Text>
            <Text style={styles.InfoTxt}>{item.omdb.Awards}</Text>
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
}

DetailsPage.navigationOptions = ({ navigation }) => {
  title: navigation.state.params.item.title
}

const styles = StyleSheet.create({
  HeadImageBg: {
    display: 'flex',
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-around',
    borderRadius: 15
  },
  HeadImage: {
    height: 200,
    width: 150,
    borderRadius: 15
  },
  HeaderTitle: {
    fontSize: 35,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'white',
    marginVertical: 5
  },
  HeaderTitleOrigin: {
    fontSize: 22,
    fontWeight: '600',
    paddingHorizontal: 20,
    color: 'white',
    marginVertical: 5
  },
  HeadView: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  HeaderInfoLabel: {
    fontWeight: '600',
    fontSize: 18,
    paddingVertical: 3,
    marginTop: 10,
    color: 'white'
  },
  HeaderInfoTxt: {
    color: 'white'
  },
  InfoLabel: {
    fontWeight: '600',
    fontSize: 18,
    paddingVertical: 8,
    marginTop: 10,
  },
  InfoTxt: {
    paddingLeft: 20
  },
  BottomView: {
    padding: 20,
    flex: 1
  }
});

export default DetailsPage;
