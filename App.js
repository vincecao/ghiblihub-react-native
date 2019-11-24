import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from './components/layout/Dashboard';
import DetailsPage from './components/layout/DetailsPage';
import WebViewPage from './components/layout/WebViewPage';

const RootStack = createStackNavigator(
  {
    Home: Dashboard,
    DetailsPage: DetailsPage,
    WebPage: WebViewPage
  },
  { initialRouteName: 'Home' }
);

const App = createAppContainer(RootStack);

export default App