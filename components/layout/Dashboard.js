import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import DashboardCard from '../parts/DashBoardCard'
import { OMDB_APIKEY, TMDB_APIKEY } from '../../env'
export default class Dashboard extends Component {



  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'rgba(255,255,255, 0.9)',
    },
    headerTintColor: 'black',
    title: 'Ghibli Hub',
  }

  constructor() {
    super();
    this.state = {
      data: [],
      fetching: true,
      queryLength: -999
    }
  }

  componentDidMount = () => {
    this.fetchGhibliData()
  }

  fetchOmdbDetail = (data, index) => {
    fetch('http://www.omdbapi.com/?apikey=' + OMDB_APIKEY + '&t=' + data.title)
      .then(response => response.json())
      .then(omdb => {
        data['omdb'] = omdb;
        this.fetchTmdbIdByImdbId(data, omdb['imdbID'], index)
      })
      .catch(err => console.error('error fetching movie', err))
  }

  fetchGhibliData = () => {
    fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => response.json())
      .then(data => {
        this.setState({
          queryLength: data.length
        })
        data.map((data, index) => {
          this.fetchOmdbDetail(data, index)
        })
      })
      .catch(err => console.error('error fetching ghi', err))
  }

  geTmdbBImage = (extend, size) => {
    if (size === 0) {
      //thum
      return 'https://image.tmdb.org/t/p/w500_and_h282_face' + extend
    } else {
      return 'https://image.tmdb.org/t/p/w1280' + extend
    }
  }

  fetchTmdbIdByImdbId = (data, imdbId, index) => {
    fetch('https://api.themoviedb.org/3/find/' + imdbId + '?api_key=' + TMDB_APIKEY + '&language=en-US&external_source=imdb_id')
      .then(response => response.json())
      .then(tmdb => {
        if (tmdb.success) {
          tmdb = tmdb['movie_results'][0]
          tmdb['backdrop_path'] = this.geTmdbBImage(tmdb['backdrop_path'], 0)
          tmdb['poster_path'] = this.geTmdbBImage(tmdb['poster_path'], 0)
        }

        data['tmdb'] = tmdb

        this.setState({
          data: [...this.state.data, data]
        })

        if (this.state.queryLength === (index - 1)) {
          this.setState({
            fetching: false
          })
        }

      })
      .catch(err => {
        // data['tmdb'] = {}
        // data['tmdb']['movie_results'] = [{}]
        // this.setState({
        //   data: [...this.state.data, data]
        // })
        console.error('error fetch tmdbIdByImdbId', err)
      })

  }

  fetchTmdbDetailById = () => {
    fetch('https://api.themoviedb.org/3/movie/12477?api_key=' + TMDB_APIKEY + '&language=en-US')
      .then(response => response.json())
      .then(data => {
        this.setState({
          queryLength: data.length
        })
        data.map((data, index) => {
          this.fetchMoviePoster(data, index)
        })
      })
      .catch(err => console.error('error fetching ghi', err))
  }

  showFlatList = () => {
    const { data } = this.state
    const { navigate } = this.props.navigation
    return <FlatList
      data={data}
      ItemSeparatorComponent={this.FlatListItemSeparator}
      renderItem={({ item, index }) => <DashboardCard item={item} index={index} onSelected={() => navigate('DetailsPage', { item })} />}
      ListHeaderComponent={() => {
        return <View style={styles.headerSectionContainer}>
          <Text style={styles.headerTitle}>Movie</Text>
        </View>
      }}
    // stickyHeaderIndices={[this.state.queryLength]}
    />
  }



  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        {/* <SafeAreaView> */}
        <ActivityIndicator size="large"
          style={styles.spinner}
          animating={this.state.fetching} />
        {this.showFlatList()}

        {/* </SafeAreaView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  flexStyle: {
    flex: 1
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
  },
  headerSectionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: 'rgba(255,255,255, 1)'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  }
});
