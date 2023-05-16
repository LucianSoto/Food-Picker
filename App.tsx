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
import axios from 'axios'

function App(): JSX.Element {
  const [data, setData] = useState<object>({})
  const YelpKey = process.env.YELP_API

  const config = { 
    headers: {
      Authorization: "Bearer" + " " + YelpKey,
    },
    // params: {
    //   radius: 1000,
    //   // sort_by: "relevance",
    // },
  }

  useEffect(() => {
    axios
      .get('https://api.yelp.com/v3/businesses/search?location=seattle&sort_by=best_match&limit=20', config)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error, 'error api')
      })
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
