import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

const DashBoardCard = ({ item, index, onSelected=f=>f }) => {
  return (
    <TouchableHighlight style={styles.button}
      onPress={() => onSelected(item)}
      underlayColor="gray">
      <View style={styles.sectionContainer} key={index}>
        <Text style={styles.sectionTitleSm}>{item.title} ({item.release_date})</Text>
        <View style={styles.sectionDescription}>
          <Image
            style={styles.ImagePoster}
            source={{ uri: item.omdb.Poster }}
          />
          <View style={{ flexDirection: 'column', flex: 1, padding: 7, justifyContent: 'space-around' }}>
            <Text
              style={styles.sectionText, { fontSize: 17, paddingBottom: 20 }}
            >{item.omdb.Plot}</Text>
            <View>
              <Text
                style={[styles.txtBold]}
              >Director: </Text>
              <Text
                style={styles.sectionText}
              >{item.director}</Text>
            </View>
            <View>
              <Text
                style={[styles.txtBold]}
              >Producer: </Text>
              <Text
                style={styles.sectionText}
              >{item.producer}</Text>
            </View>
            <View>
              <Text
                style={[styles.txtBold]}
              >Genre: </Text>
              <Text
                style={styles.sectionText}
              >{item.omdb.Genre}</Text>
            </View>
            <View>
              <Text
                style={[styles.txtBold]}
              >Runtime: </Text>
              <Text
                style={styles.sectionText}
              >{item.omdb.Runtime}</Text>
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
    fontSize: 15
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
  sectionDescription: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
  ImagePoster: {
    width: 200,
    height: 350,
    borderRadius: 10
  },
  sectionText: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 5,
    paddingTop: 5

  }
})

export default DashBoardCard;