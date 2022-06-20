import React, {ReactElement} from 'react';
import {
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
  ScrollView,
} from 'react-native';

type PhotoCardProps = {
  imageSources: (string | undefined)[];
};

export default function PhotoCards({
  imageSources,
}: PhotoCardProps): ReactElement {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {imageSources.map(uri => {
        if (!uri) {
          return null;
        }
        return (
          <TouchableHighlight key={uri} underlayColor="gray">
            <Image style={styles.image} source={{uri}} />
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: Dimensions.get('window').width,
  },
});
