import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import Geolocation from 'react-native-geolocation-service'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { locationPermission } from '../../utils/permissions';
import List from '../components/list/list'
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth'
import EStyleSheet from 'react-native-extended-stylesheet'

Icon.loadFont().catch((error) => { console.info(error); });

type Props = {
  navigation: any,
}
interface Igeo {
  latitude: string,
  longitude: string,
}

const Home = (props: Props) => {
  const YelpKey = process.env.YELP_API
  const {navigation} = props
  const {width} = Dimensions.get('window')
  const [initializing, setInitializing] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Array<string>>([])
  const [distance, setDistance] = useState<string>('5000')
  const [limit, setLimit] = useState<string>('10')
  const [openNow, setOppenNow] = useState<boolean>(true)
  const [location, setLocation] = useState<any>()
  const [geo, setGeo] = useState({})

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

  useEffect(() => {
    getLocation()
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
  
  const openFilters = () => {
    console.log('opening filters')
  }

  const getList = () => {
    if(typeof(location) === 'string') {
      setGeo(false)
    }
    // CHANGE TO AXIOS STYLE OF CALL LATER  -- NOT WORKING WITH ACTUAL AXIOS PARAMS
    axios 
      .get(`https://api.yelp.com/v3/businesses/search?location=${location}&latitude=${location? '' 
      : geo.latitude}&longitude=${location? '' 
      : geo.longitude}&open_now=${openNow ? 'true' 
      : 'false'}&radius=${distance}&sort_by=best_match&limit=${limit}`, config)
      .then((response) => {
        setData(response.data.businesses)
      })
      .catch((error) => {
        console.log(error, 'error api HOME')
      })
  }

  // IF INITIALIZING HAVE A LOADING ANIMATION.
  return (
    <SafeAreaView style={styles.main_container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.list_view}
      >
        <View 
          style={{flexDirection: "row", alignItems: 'center'}}
        >
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
            style={styles.filterButton}
            name="chevron-down"
            onPress={openFilters}
          />
        </View>
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
    width: '100%',
    borderBottom: '10px red'
  },
  input: {
    height: 60,
    width: "90%",
    margin: 10,
    marginTop: 15,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 20,
    borderRadius: 30,
    fontSize: 23,
    color: "white",
  },
  filterButton: {
    // width: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -50,
    fontSize: 25,
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
  list_view: {
    backgroundColor: '$mainColor_black',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  }
});

export default Home