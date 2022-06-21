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
      {ratings.map(({Source: source, Value: value}) => (
        <Text style={styles.loop} key={source}>
          <Text style={styles.label}>{`${source}: `}</Text>
          <Text>{value}</Text>
        </Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  loop: {paddingLeft: 20, paddingVertical: 3},
  label: {fontWeight: '600', paddingLeft: 15},
});
