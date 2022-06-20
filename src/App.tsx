import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Dashboard from './components/Dashboard';
import DetailsPage from './components/DetailsPage';
import WebViewPage from './components/WebViewPage';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GhibliHub" component={Dashboard} />
        <Stack.Screen
          name="DetailsPage"
          component={DetailsPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WebPage"
          component={WebViewPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}
