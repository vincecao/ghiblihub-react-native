import React, {Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Rating} from '../hooks/useOmdb';
import DetailPageRatings from './DetailPageRatings';

type DetailPageBodyProps = {
  bodySections: [string, string | number | Rating[]][];
};

export default function DetailPageBody({bodySections}: DetailPageBodyProps) {
  return (
    <View style={styles.BodyView}>
      {bodySections.map(([label, value]) => {
        return (
          <Fragment key={label}>
            <Text style={styles.InfoLabel}>{label}</Text>
            {typeof value === 'object' ? (
              <DetailPageRatings ratings={value} />
            ) : (
              <Text style={styles.InfoTxt}>{value}</Text>
            )}
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  BodyView: {
    padding: 20,
    flex: 1,
  },
  InfoLabel: {
    fontWeight: '600',
    fontSize: 18,
    paddingVertical: 8,
    marginTop: 10,
  },
  InfoTxt: {
    paddingLeft: 20,
  },
});
