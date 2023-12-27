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
        // console.log(response.data)
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
        console.log(response.data.reviews)
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

  // console.log(data.photos, 'BPAGE')
  // console.log('BPAGE', reviews)
  
  return (
    <View style={{flex: 1}}>
      <Text>{data.name}</Text>
      <Carousel
          data={data.photos}
          renderItem={({item, index}) => {
            return (
              <View>
                <Image 
                  source={{uri: item}}
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

const styles = StyleSheet.create({
  slide: {

  },
  title: {

  },
})

export default BusinessPage