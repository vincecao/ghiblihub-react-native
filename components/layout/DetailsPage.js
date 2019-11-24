import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  ImageBackground,
  ScrollView
} from 'react-native';

const loopRating = (item) => {
  return item.omdb.Ratings.map((rating, index) => <Text style={{ paddingLeft: 15 }} key={index + '-loop'}><Text style={{ fontWeight: '600', paddingLeft: 15 }} key={index + '-label'}>{rating.Source}: </Text><Text key={index + 'value'}>{rating.Value}</Text></Text>)
}

const DetailsPage = ({ navigation }) => {
  let item = navigation.state.params.item
  const { navigate } = navigation
  return (
    <>
      <StatusBar barStyle="dark-content" />
      {/* <SafeAreaView> */}
      <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.02)'}}>
        <View>
          <ImageBackground style={styles.HeadImageBg} blurRadius={Platform.OS == 'ios' ? 10 : 5}
            source={{ uri: item.omdb.Poster }}>
            <View style={{ position: 'absolute', width: Dimensions.get('window').width, height: 500, flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}></View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Image style={styles.HeadImage} source={{ uri: item.omdb.Poster }}></Image>
              <Text style={styles.HeaderTitle}>{item.title}</Text>
            </View>
            <View style={styles.HeadView}>
              <Text style={styles.HeaderInfoLabel}>Description</Text>
              <ScrollView>
                <Text style={styles.HeaderInfoTxt}>{item.description}</Text>
              </ScrollView>
              <Text style={styles.HeaderInfoLabel}>Director</Text>
              <Text style={styles.HeaderInfoTxt}>{item.director}</Text>
              <Text style={styles.HeaderInfoLabel}>Producer</Text>
              <Text style={styles.HeaderInfoTxt}>{item.producer}</Text>
              <Text style={styles.HeaderInfoLabel}>Release_date</Text>
              <Text style={styles.HeaderInfoTxt}>{item.release_date}</Text>
            </View>
          </ImageBackground>
          <View style={styles.BottomView}>
            <Text style={styles.InfoLabel}>Release Date</Text>
            {loopRating(item)}
            <Text style={styles.InfoLabel}>imdbID</Text>
            <Text style={{ color: 'blue', paddingLeft: 30 }} onPress={(e) => navigate('WebPage', { uri: 'https://www.imdb.com/title/' + item.omdb.imdbID, })}>{item.omdb.imdbID.toUpperCase()}</Text>
            <Text style={styles.InfoLabel}>Website</Text>
            <Text style={styles.InfoTxt}>{item.omdb.Website}</Text>
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
    height: 500,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'space-around'
  },
  HeadImage: {
    height: 200,
    width: 150,
    borderRadius: 15
  },
  HeaderTitle: {
    flex: 1,
    fontSize: 40,
    fontWeight: '600',
    padding: 20,
    color: 'white'
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
    paddingLeft: 30
  },
  BottomView: {
    padding: 20,
    flex: 1
  }
});

export default DetailsPage;
