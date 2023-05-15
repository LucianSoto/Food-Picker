/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import GetLocation from 'react-native-get-location';
import { useState, useEffect } from 'react'
// import Config from 'react-native-config'
// import {YELP_API} from '@env'
import {YELP_API} from 'react-native-dotenv'

function App(): JSX.Element {
  const [data, setData] = useState<object>({})
  // console.log(Config.YELP_API, 'YELP API')
  console.log(process.env.YELP_API,' hello')
  // console.log(YELP_API)

  useEffect(() => {
    const options = {method: 'GET', headers: {accept: 'application/json'}}
    fetch('https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=20', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  },[])


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
        <Text>NomNom Roulette</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
