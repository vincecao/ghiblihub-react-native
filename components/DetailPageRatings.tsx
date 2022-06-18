import React, {ReactElement} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Rating} from '../hooks/useOmdb';

type DetailPageRatingsProps = {
  ratings: Rating[];
};

export default function DetailPageRatings({
  ratings,
}: DetailPageRatingsProps): ReactElement {
  return (
    <>
      {ratings.map(({Source, Value}, index) => (
        <Text style={styles.loop} key={`${index}-loop`}>
          <Text style={styles.label} key={`${index}-label`}>
            {`${Source}:`}
          </Text>
          <Text key={index + 'value'}>{Value}</Text>
        </Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  loop: {paddingLeft: 20, paddingVertical: 3},
  label: {fontWeight: '600', paddingLeft: 15},
});
