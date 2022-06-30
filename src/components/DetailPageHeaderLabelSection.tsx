import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

function stripHtmlTags(str: string): string {
  return str.replace(/(<([^>]+)>)/g, '');
}

type DetailPageHeadLabelSectionProps = {
  label: string;
  value: string | number;
};

export default function DetailPageHeadLabelSection({
  label,
  value,
}: DetailPageHeadLabelSectionProps) {
  return (
    <>
      <Text style={styles.HeaderInfoLabel}>{label}</Text>
      <ScrollView style={styles.HeaderInfoTxtView}>
        <Text style={styles.HeaderInfoTxt}>{stripHtmlTags(String(value))}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  HeaderInfoLabel: {
    fontWeight: '600',
    fontSize: 18,
    paddingVertical: 3,
    marginTop: 10,
    color: 'white',
  },
  HeaderInfoTxtView: {
    maxHeight: 50,
  },
  HeaderInfoTxt: {
    color: 'white',
  },
});
