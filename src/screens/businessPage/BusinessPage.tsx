import React , { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'

{/* <Text onPress={()=>{Linking.openURL(`tel:${item.phone}`);}}> */}// TO MAKE PHONE CALLS

// search business by ID to get rich information
//search business reviews to display at bottom
const options = { 
  method: 'GET',
  url: 'https://api.yelp.com/v3/businesses/search',
  params: {
    location: location,
    latitude: location ? null : geo.latitude,
    longitude: location ? null : geo.longitude,
    open_now: openNow,
    term: term,
    // categories: categories,
    price: price.length,
    radius: Math.floor(distance[0] * 1600),
    limit: limit,
    sort_by: sortBy.replace(/ /g,"_").toLowerCase(),
  },
  headers: {
    accept: 'application/json',
    Authorization: "Bearer " + YelpKey,
  }
}

const getList = () => {
  axios
    .request(options)
    .then((response) => {
      if(showOptions) {toggleOptions()}
      setData(response.data.businesses)
    })
    .catch((error) => {
      console.log(error, 'error api HOME')
      console.log(error.message, 'Message')
      setData([])
      if(showOptions){toggleOptions()}
    })
} 

const BusinessPage = (props) => {
  console.log(props.route.params.id,'BUSINESS PAGE')
  const id = props.route.params.id
  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default BusinessPage