import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

const PhotoCard = ({ item, index, onSelected = f => f }) => {
  return (
    <>
      <TouchableHighlight
        onPress={() => onSelected(item)}
        underlayColor="gray">
        <View style={styles.sectionContainer} key={index}>
          <Image style={styles.section} key={index + '-photoCard-Component'} source={{ uri: item }} />
        </View>
      </TouchableHighlight>
    </>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: Dimensions.get('window').width
  },
  section: {
    height: 200,
    width: Dimensions.get('window').width
  }
})

export default PhotoCard;