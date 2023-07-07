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
  TouchableOpacity,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { locationPermission } from '../utils/permissions';
import List from '../components/list/list'
import Icon from 'react-native-vector-icons/FontAwesome';
import { relative } from 'path';

const Main = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Array<string>>([])
  const [location, setLocation] = useState<any>()
  const [distance, setDistance] = useState<string>('5000')
  const [limit, setLimit] = useState<string>('10')
  const [openNow, setOppenNow] = useState<boolean>(true)
  const [geo, setGeo] = useState({})
  const YelpKey = process.env.YELP_API
  // interface Icoordinates {
//   latitude: string;
//   longitude: string;
// }

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

  const config = { 
    headers: {
      Authorization: "Bearer " + YelpKey,
    },
  }
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

  const openFilters = () => {
    console.log('opening filters')
  }

  return (
    <View
      style={{flexDirection: "column", alignItems: "center", flex: 1, backgroundColor: "black"}}
      // style={{
        // backgroundColor: isDarkMode ? Colors.black : Colors.white,
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list_view}
      >
        <View 
          style={{flexDirection: "row", alignItems: 'center',}}
        >
          <TextInput 
            style={styles.input}
            onChangeText={text => setLocation(text)}
            value={location}
            placeholder='City, State'
            keyboardType='default'
            onSubmitEditing={()=> getList()}
            clearButtonMode='while-editing'
            placeholderTextColor={'white'}
          />
          <Icon
            style={styles.filterButton}
            name="chevron-down"
            onPress={openFilters}
          />
        </View>
          {data && <List data={data} />}
      </ScrollView>
        <TouchableOpacity
          style={styles.main_button}
          onPress={()=> getList()}
        >
          <Text style={styles.main_button_text}>ROULETTE</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  input: {
    height: 50,
    width: "90%",
    margin: 10,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 20,
    borderRadius: 30,
    fontSize: 23,
    color: "white",
  },
  filterButton: {
    width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -50,
    fontSize: 25,
    color: "lightgray",
  },
  main_button: {
    marginVertical: 10,
    width: '95%',
    padding: 9,
    backgroundColor: '#ff1a1a',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'relative',
    bottom: 0,
  },
  main_button_text: {
    color: '#fff',
    fontSize: 20,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list_view: {
    backgroundColor: 'black',
    flexDirection: 'column',
    alignItems: 'center',
  }
});

export default Main