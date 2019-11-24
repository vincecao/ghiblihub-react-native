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
import { OMDB_APIKEY } from '../../env'
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

  fetchMoviePoster = (data, index) => {
    fetch('http://www.omdbapi.com/?apikey=' + OMDB_APIKEY + '&t=' + data.title)
      .then(response => response.json())
      .then(omdb => {
        let tempData = data;
        tempData['omdb'] = omdb;
        this.setState({
          data: [...this.state.data, tempData]
        })
        console.log(tempData)
        if (this.state.queryLength === (index - 1)) {
          this.setState({
            fetching: false
          })
        }
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
      renderItem={({ item, index }) => <DashboardCard item={item} index={index} onSelected={() => navigate('DetailsPage', {item})}/>}
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
