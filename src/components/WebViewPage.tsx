import React, {ReactElement} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {ParamList} from '../types';

export default function WebViewPage({
  route,
}: NativeStackScreenProps<ParamList, 'WebPage'>): ReactElement {
  return <WebView style={styles.container} source={route.params} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
