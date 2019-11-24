import React from 'react'

import {
  StyleSheet
} from 'react-native'

import {WebView} from 'react-native-webview'

const WebViewPage = ({ navigation }) => (
  <WebView style={styles.container}
    source={navigation.state.params}
  />
)

WebViewPage.navigationOptions = {
  title: ''
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default WebViewPage