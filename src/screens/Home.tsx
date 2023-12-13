Icon.loadFont().catch((error) => {});
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { locationPermission } from '../../utils/permissions';
import List from '../components/list/list'
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from '../components/search/Search'
import EStyleSheet from 'react-native-extended-stylesheet'

type Props = {
  navigation: any,
}
interface Igeo {
  latitude: string,
  longitude: string,
}

interface ISearchOptions {
  distance: string,
  limit: string,
  price: any,
  term: string,
  openNow: boolean,
  categories: string,
}

const Home = (props: Props) => {
  const YelpKey = process.env.YELP_API
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Array<string>>([])
  const [location, setLocation] = useState<any>()
  const [geo, setGeo] = useState({})
  const [searchOptions, setSearchOptions] = useState<ISearchOptions>({
    distance: '2000', // 1 - 5
    limit: '5',  // 1- 2
    price: '2', // int or string?
    term: '',
    openNow: true,
    categories: '',
  })

  const {distance, limit, price, term, openNow, categories} = searchOptions
  
  const getLocation = () => {
    if(Platform.OS === "ios") {
      Geolocation.getCurrentPosition(
        position => {
          setGeo(position.coords);
          setLoading(true)
          return position.coords
        },
        error => {
          console.log(error.code, error.message, 'ERROR in getLocation HOME');
          setGeo({
            latitude: '',
            longitude: '',
          });
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      const permission = locationPermission();
      permission.then(res => {
        if (res) {
          Geolocation.getCurrentPosition(
            position => {
              setGeo(position.coords);
              setLoading(true)
              return position.coords
            },
            error => {
              console.log(error.code, error.message, 'ERROR in getLocation HOME');
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
    }
  };

  const changeSearchOptions = (options) => {
    console.log(options)
  }

  useEffect(() => {
    getLocation()
  },[])
useEffect(() => {
    if(!geo) {
      return
    }
    getList()
  }, [loading])

  const options = { 
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    params: {
      location: location,
      latitude: geo.latitude,
      longitude: geo.longitude,
      open_now: openNow,
      term: term,
      categories: categories,
      price: price,
      radius: distance,
      limit: limit,
      sort_by: 'best_match'
    },
    headers: {
      accept: 'application/json',
      Authorization: "Bearer " + YelpKey,
    }
  }
  
  const openFilters = () => {
    console.log('opening filters')
  }
  
  const getList = () => {
    if(typeof(location) === 'string') {
      setGeo(false)
    }
    axios
      .request(options)
      .then((response) => {
        setData(response.data.businesses)
      })
      .catch((error) => {
        console.log(error, 'error api HOME')
      })
  }  

  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scroll_view}
        >
        <View style={styles.search_container}>
          <TextInput 
            style={styles.input}
            onChangeText={text => setLocation(text)}
            value={location}
            placeholder='City, State'
            keyboardType='default'
            onSubmitEditing={()=> getList()}
            clearButtonMode='while-editing'
            placeholderTextColor={'gray'}
          />
          <Icon
            size={20}// commented out in styles below
            style={styles.filter_button}
            name="chevron-down"
            onPress={openFilters}
          />
        </View>
        <Search searchOptions={searchOptions}/>
        { data ? 
          <List data={data} /> 
          : 
          <View>
            <Text onPress={()=> getList()}>Load List</Text>
          </View>
        }
      </ScrollView>
        <TouchableOpacity
          style={styles.main_button}
          onPress={()=> getList()}
        >
          <Text style={styles.main_button_text}>MANGIA</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = EStyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '$mainColor_black',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '10px red'
  },
  scroll_view: {
    // flex: 1, did not need ??
    backgroundColor: '$mainColor_black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    overflow: 'none',
  },
  search_container: {
    flex: 1,
    flexDirection: "row", 
    alignItems: 'center', 
    width: "100%"
  },
  input: {
    height: 60,
    width: '90%',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30,
    fontSize: 23,
    color: "white",
  },
  filter_button: {
    alignItems: 'center',
    top: 5,
    fontSize: 25,
    marginRight: 10,
    color: "lightgray",
  },
  main_button: {
    marginVertical: 10,
    width: '90%',
    padding: 9,
    backgroundColor: '$mainColor_magenta',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'relative',
  },
  main_button_text: {
    color: '$mainColor_white',
    fontSize: 20,
    bottom: 0,
  },
});

export default Home