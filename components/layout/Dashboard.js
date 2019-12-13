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
import { OMDB_APIKEY, TMDB_APIKEY, CUSTOMIZED_GOOGLE_SEATCH } from '../../env'
// import { OMDB_APIKEY, TMDB_APIKEY, CUSTOMIZED_GOOGLE_SEATCH } from '../../env-dev'
export default class Dashboard extends Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'rgba(255,255,255, 0.9)',
    },
    headerTintColor: 'black',
    title: 'Ghibli Hub',
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fetching: true,
      queryLength: -999,
      anlist: []
    }
  }

  componentDidMount = () => {
    // this.fetchGhibliData()
    this.fetchAnilist(this.query, this.variables)
  }

  query = `query ($id: Int, $page: Int) {
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
                # tags {
                #   name
                # }
              }
            }
          }
        }
          `;

  variables = {
    id: 21,
    page: 1
  };

  fetchAnilist = (query, variables) => {
    fetch('https://graphql.anilist.co', { //url, option
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    })
      .then(response => response.json())
      .then(anlist => {
        let hasNextPage = anlist["data"]["Studio"]["media"]["pageInfo"]["hasNextPage"]
        anlist = anlist["data"]["Studio"]["media"]["nodes"]

        this.setState({
          anlist: [...this.state.anlist, ...anlist]
        })

        if (hasNextPage === true) {
          this.fetchAnilist(query, { id: 21, page: variables['page'] + 1 })
        } else {
          this.setState({
            queryLength: anlist.length
          })
          // console.log(this.state.anlist.length, this.state.queryLength)
          this.state.anlist.map((data, index) => {
            data['photos'] = ['']
            data['tmdb'] = {}
            data['omdb'] = {}
            data["native"] = data["title"]["native"] ? data["title"]["native"] : ''
            data["title"] = data["title"]["english"] ? data["title"]["english"] : data["title"]["romaji"]
            data["release_date"] = data["startDate"]["year"]

            //Image defalut
            data['coverImage']['extraLarge'] = data['coverImage']['extraLarge'] ? data['coverImage']['extraLarge'] : ''
            data['bannerImage'] = data['bannerImage'] ? data['bannerImage'] : data['coverImage']['extraLarge']

            this.fetchOmdbDetail(data, index)
          })
        }
      })
      .catch(err => console.error('error fetching anlist', err))
  }

  fetchGhibliData = () => {
    fetch('https://ghibliapi.herokuapp.com/films')
      .then(response => response.json())
      .then(Gbi => {
        this.setState({
          queryLength: Gbi.length
        })

        Gbi.map((data, index) => {
          // data['photos'] = ['']
          // data['tmdb'] = {}
          // data['omdb'] = {}
          this.fetchOmdbDetail(data, index)
        })
      })
      .catch(err => console.error('error fetching ghi', err))
  }

  fetchOmdbDetail = (data, index) => {
    fetch('http://www.omdbapi.com/?apikey=' + OMDB_APIKEY + '&t=' + data.title)
      .then(response => response.json())
      .then(omdb => {
        data['omdb'] = omdb;
        data['omdb']['Poster'] = data['omdb']['Poster'] && data['omdb']['Poster'] !== 'N/A' ? data['omdb']['Poster'] : data["coverImage"]["extraLarge"]
        this.fetchTmdbIdByImdbId(data, omdb['imdbID'], index)
      })
      .catch(err => console.error('error fetching movie', err))
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
        if (tmdb.success !== false && tmdb['movie_results'] != null && tmdb['movie_results'][0] != null) {
          tmdb = tmdb['movie_results'][0]
          tmdb['backdrop_path'] = this.geTmdbBImage(tmdb['backdrop_path'], 0)
          tmdb['poster_path'] = this.geTmdbBImage(tmdb['poster_path'], 0)
        }

        data['tmdb'] = tmdb
        data['tmdb']['backdrop_path'] = data['tmdb']['backdrop_path'] ? data['tmdb']['backdrop_path'] : data['bannerImage']
        data['tmdb']['poster_path'] = data['tmdb']['poster_path'] ? data['tmdb']['poster_path'] : data["coverImage"]["extraLarge"]
        this.fetchGoogleImage(data, tmdb.title, index)

      })
      .catch(err => {
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

  fetchGoogleImage = (data, keyword, index) => {
    fetch(CUSTOMIZED_GOOGLE_SEATCH + '&productTitle=' + keyword + ' screenshots')
      .then(response => response.json())
      .then(googleImage => {
        data['photos'] = googleImage
        this.setState({
          data: [...this.state.data, data]
        })

        this.checkStopLoading()

      })
      .catch(err => console.error('error googleImage ghi', err))
  }

  checkStopLoading = (index) => {
    if (this.state.queryLength === (index - 1)) {
      this.setState({
        fetching: false
      })
    }
  }

  showFlatList = () => {
    const { data } = this.state
    const { navigate } = this.props.navigation
    return <FlatList
      data={data}
      renderItem={({ item, index }) => <DashboardCard item={item} index={index} onSelected={() => navigate('DetailsPage', { item })} />}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => {
        return <View style={styles.headerSectionContainer}>
          <Text style={styles.headerTitle}>Movie</Text>
        </View>
      }}
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
