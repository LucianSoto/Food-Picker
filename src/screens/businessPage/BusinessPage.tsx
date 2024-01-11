import React , { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Linking, Dimensions, StyleSheet, Image } from 'react-native'
// import FastImage from 'react-native-fast-image' ALTERNATIVE TO LOAD IMAGES FASTER/BETTER
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel, { Pagination } from 'react-native-snap-carousel';
{/* <Text onPress={()=>{Linking.openURL(`tel:${item.phone}`);}}> */}// TO MAKE PHONE CALLS
interface Idata {
  name: string,
  phone: string,

}
// interface Ireviews {
// }

const BusinessPage = (props) => {
  const width = Dimensions.get('window').width;
  const YelpKey = process.env.YELP_API
  const [data, setData] = useState<Object>({})
  const [reviews, setReviews] = useState<Array<string>>([])
  const id = props.route.params.id
  console.log(id, 'ID bPAGE')
  const options = { 
    method: 'GET',
    url: `https://api.yelp.com/v3/businesses/${id}`,
    headers: {
      accept: 'application/json',
      Authorization: "Bearer " + YelpKey,
    }
  }
  const reviewsOptions = {
    method: 'GET',
    url: `https://api.yelp.com/v3/businesses/${id}/reviews`,
    headers: {
      accept: 'application/json',
      Authorization: "Bearer " + YelpKey,
    }
  }
  
  const getData = () => {
    axios
      .request(options)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error, 'error api HOME')
        console.log(error.message, 'Message')
        setData({})
      })
  } 

  const getReviews = () => {
    axios
      .request(reviewsOptions)
      .then((response) => {
        setReviews(response.data.reviews)
      })
      .catch((error) => {
        console.log(error, 'error api HOME')
        console.log(error.message, 'Message')
        setReviews([])
      })
  }

  const renderReviews = reviews.map((review, i) => {
    return (
      <Text key={i}>{review.text}</Text>
    )
  })
  
  useEffect(()=> {
    getData()
    getReviews()
  },[])

  // console.log('DATA BUSINESSPAGE >>>', data)
  console.log('REVIEWS:::::  ', reviews)
  console.log('PHOTOS >>>' , data.photos? data.photos[0]: null)
  
  return (
    <View style={{flex: 1}}>
      <Text>{data.name}</Text>

      <Carousel
          data={data.photos}
          // fix carousel
          renderItem={({item, index}) => {
            return (
              <View>
                <Image 
                  source={{uri: item}}
                  style={{height: 500, width: width}}
                />
              </View>
            )
          }}
          sliderWidth={width}
          itemWidth={500}    
      />
        {renderReviews}
    </View>
  )
}

export default BusinessPage