import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const IMDB_IMAGE_SRC =
  'https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png';

type IMDBLogoProps = {
  onPress: () => void;
};

export default function DetailPageIMDBLogo({onPress}: IMDBLogoProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={styles.image}
        source={{
          uri: IMDB_IMAGE_SRC,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 70,
    height: 40,
    resizeMode: 'contain',
    marginTop: 20,
  },
});
