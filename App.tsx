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
  TextInput,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import GetLocation from 'react-native-get-location';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App(): JSX.Element {
  const [data, setData] = useState<object>({})
  const [location, setLocation] = useState<string>('')
  const [distance, setDistance] = useState<string>('5000')
  const [limit, setLimit] = useState<string>('')
  const YelpKey = process.env.YELP_API

  const config = { 
    headers: {
      Authorization: "Bearer " + YelpKey,
    },
  }

  useEffect(() => {
    
  },[])

  const getList = (location: string, distance: string) => {
    console.log(location, distance)
    axios
      .get(`https://api.yelp.com/v3/businesses/search?location=${location}&radius=${distance}&sort_by=best_match&limit=3`, config)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error, 'error api')
      })
  }

  
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
        <Text style={styles.title}>NomNom Roulette</Text>

        <TextInput 
          style={styles.input}
          onChangeText={text => setLocation(text)}
          value={location}
          placeholder='location'
          keyboardType='default'
          onSubmitEditing={()=> getList(location, distance)}
          clearButtonMode='while-editing'
        />
        {/* create component to display restaurant info */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default App;
