import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

type DashboardCardLabelSectionProps = {
  label: string;
  text: string;
};

export default function DashboardCardLabelSection({
  label,
  text,
}: DashboardCardLabelSectionProps) {
  return (
    <View style={styles.labelSectionView}>
      <Text style={styles.labelText}>{label}: </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={styles.sectionText}>{text}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  labelSectionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelText: {
    fontWeight: '600',
    fontSize: 14,
  },
  sectionText: {
    fontSize: 13,
    paddingLeft: 5,
  },
});
