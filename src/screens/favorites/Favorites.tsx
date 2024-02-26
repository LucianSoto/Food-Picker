// Icon.loadFont().catch((error) => {});
import { View, Text, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import firestore from '@react-native-firebase/firestore'
import {useSelector} from 'react-redux'
import axios from 'axios'
import List from '../../components/list/List'
import { map } from 'modern-async'
import EStyleSheet from "react-native-extended-stylesheet"
import Loader from '../../components/loader/Loader'

const Favorites = () => {
  const YelpKey = process.env.YELP_API
  const collection = firestore().collection('users')
  const user = useSelector(state => state.user.data)
  const id = user.uid
  const [favorites, setFavorites] = useState([])
  const [dataArray, setDataArray] = useState<Array<string>>([])

  const getFavs = async () => { 
    const favs = await collection
      .where('userRef', '==', id)
      .get()
      .then(querySnapShot => {
        return querySnapShot.docs[0].data().favorites
      });
    setFavorites(favs)
  }

  const config = { 
    headers: {
      Authorization: "Bearer " + YelpKey,
    },
  }
  const options = {method: 'GET', headers: {accept: 'application/json'}};

  const getList = async () => {
    // map through favs adding each restaurant to data then pass to list component
    const call = await map(favorites, async (id) => {
      try{
        const res = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, config)
        const data = res.data
        setDataArray(prevState => [...prevState, data])
      } catch (err) {
        console.log(err)
      }
    })
  }
  
  useEffect(()=> {
      getFavs()
  },[])
// IMPORTANT : SEPARATE CALLS OR DEFINE A BETTER FUNCTION TO CALL THE BOTH CONDITIONALY?
  useEffect(()=> {
    if(dataArray.length < 1) {
      getList()
    }
  })
  // add toggleFav function over here too

  if(!dataArray) {
    return (
      <Loader />
    )
  }

  return (
    <View style={styles.main_container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scroll_view}
      >
      <Text style={styles.title}>Favorites</Text>
        <List data={dataArray} />
      </ScrollView>
    </View>
  )
}

export default Favorites

const styles =  EStyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '$mainColor_black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottom: '10px red'
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginVertical: 20,
  },
  scroll_view: {
    backgroundColor: '$mainColor_black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'none',
  },
  no_favs: {
    color: 'white',
    marginTop: 50,
    fontSize: 25,
  }
})