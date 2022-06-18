import React, {ReactElement} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

type PhotoCardProps = {
  imageSources: string[];
};

export default function PhotoCard({
  imageSources,
}: PhotoCardProps): ReactElement {
  return (
    <>
      {imageSources.map((image, index) => {
        return (
          <TouchableHighlight key={index + '-photoCard'} underlayColor="gray">
            <View style={styles.sectionContainer} key={index}>
              <Image
                style={styles.section}
                key={index + '-photoCard-Component'}
                source={{uri: image}}
              />
            </View>
          </TouchableHighlight>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: Dimensions.get('window').width,
  },
  section: {
    height: 200,
    width: Dimensions.get('window').width,
  },
});
