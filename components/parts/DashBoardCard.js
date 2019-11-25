import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

const DashBoardCard = ({ item, index, onSelected = f => f }) => {
  return (
    <TouchableHighlight
      onPress={() => onSelected(item)}
      underlayColor="gray">
      <View style={styles.sectionContainer} key={index}>
        <Text style={styles.sectionTitleSm}>{item.title} ({item.release_date})</Text>
        <View style={{}}>
          <Image
            style={styles.ImagePoster}
            source={{ uri: item['tmdb']['poster_path']}}
          />
          <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-around' }}>
            <Text
              style={[{ fontSize: 12, paddingVertical: 10, flex: 1 }]}
            >{item.omdb.Plot}</Text>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
              <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-around' }}>
                <Text>
                  <Text
                    style={[{ fontSize: 14 }, styles.txtBold]}
                  >Director: </Text>
                  <Text
                    style={styles.sectionText}
                  >{item.director}</Text>
                </Text>
                <Text>
                  <Text
                    style={styles.txtBold}
                  >Producer: </Text>
                  <Text
                    style={styles.sectionText}
                  >{item.producer}</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-around' }}>
                <Text>
                  <Text
                    style={styles.txtBold}
                  >Genre: </Text>
                  <Text
                    style={styles.sectionText}
                  >{item.omdb.Genre}</Text>
                </Text>
                <Text>
                  <Text
                    style={styles.txtBold}
                  >Runtime: </Text>
                  <Text
                    style={styles.sectionText}
                  >{item.omdb.Runtime}</Text>
                </Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  txtBold: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14
  },
  sectionContainer: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: 'rgba(255,255,255, 1)'
  },
  sectionTitleSm: {
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 10
  },
  ImagePoster: {
    width: Dimensions.get('window').width - 30,
    height: 260,
    borderRadius: 10
  },
  sectionText: {
    flex: 1,
    fontSize: 13,
    paddingLeft: 5,
    paddingTop: 5
  }
})

export default DashBoardCard;