/**
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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Geolocation from 'react-native-geolocation-service'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { locationPermission } from './utils/permissions'

import List from './components/list/list'

// interface Icoordinates {
//   latitude: string;
//   longitude: string;
// }
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Array<string>>([])
  const [location, setLocation] = useState<any>()
  const [distance, setDistance] = useState<string>('5000')
  const [limit, setLimit] = useState<string>('8')
  const [openNow, setOppenNow] = useState<boolean>(true)
  const [geo, setGeo] = useState({})
  const YelpKey = process.env.YELP_API

  const config = { 
    headers: {
      Authorization: "Bearer " + YelpKey,
    },
  }

  const getLocation = async () => {
    const result = locationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setGeo(position.coords);
            setLoading(true)
            return position.coords
          },
          error => {
            console.log(error.code, error.message);
            setGeo({
              latitude: '',
              longitude: '',
            });
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        return true
      }
    });
  };

  useEffect(() => {
    const loadList = async () => {
      try {
        const coords = await getLocation()
        
      } catch (err) {
        console.log(err)
      }
    }
    loadList()
  },[])

  useEffect(() => {
    if(!geo) {
      return
    }
    getList()
  }, [loading])

  // Get list of places
  const getList = () => {
    if(typeof(location) === 'string') {
      setGeo(false)
    }
    axios // CHANGE TO AXIOS STYLE OF CALL LATER  -- NOT WORKING WITH ACTUAL AXIOS PARAMS
      .get(`https://api.yelp.com/v3/businesses/search?location=${location}&latitude=${location? '' : geo.latitude}&longitude=${location? '' : geo.longitude}&open_now=${openNow ? 'true' : 'false'}&radius=${distance}&sort_by=best_match&limit=${limit}`, config)
      .then((response) => {
        setData(response.data.businesses)
      })
      .catch((error) => {
        console.log(error, 'error api')
      })
  }

  return (
    <SafeAreaView style={{backgroundColor: 'lightgray'}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#ff1a1a'}
      />
      <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
        <Text style={styles.title}>NomNom</Text>
        <Text >
          Filters
        </Text>
        <TextInput 
          style={styles.input}
          onChangeText={text => setLocation(text)}
          value={location}
          placeholder='City, State'
          keyboardType='default'
          onSubmitEditing={()=> getList()}
          clearButtonMode='while-editing'
        />
        
      </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.list_view}
        >
          {data &&
            <List data={data} />
          }
        </ScrollView>
        <Button 
            title="Roulette"
            onPress={()=> getList()}
            color="#ff1a1a"
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    // margin
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list_view: {
    backgroundColor: '#e6e3e3',
    // margin: 1,
    // alignSelf: 'center',
    height: '70%',

  }
});

export default App;




// axios    GET USER LOCATION~!!!!!!!
    //   .get(`https://api.yelp.com/v3/businesses/search?location=${location}&open_now=${openNow ? 'true' : 'false'}&radius=${distance}&sort_by=best_match&limit=${limit}`, config)
    //   .then((response) => {
    //     console.log(response.data)

    //   })
    //   .catch((error) => {
    //     console.log(error, 'error api')
    //   })