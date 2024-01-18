import React , { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Linking, Dimensions, StyleSheet, Image } from 'react-native'
// import FastImage from 'react-native-fast-image' ALTERNATIVE TO LOAD IMAGES FASTER/BETTER
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Carousel from 'react-native-reanimated-carousel';
import Carousel from 'react-native-snap-carousel';
import styles from './businessPageStyles'
import {Rating, AirbnbRating} from 'react-native-ratings'
{/* <Text onPress={()=>{Linking.openURL(`tel:${item.phone}`);}}> */}// TO MAKE PHONE CALLS
interface Idata {
  name: string,
  phone: string,

}
// interface Ireviews {
// }

const BusinessPage = (props) => {
  const screenWidth = Dimensions.get('window').width;
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
      <Text key={i} style={styles.review}>{review.text}</Text>
    )
  })
  
  useEffect(()=> {
    getData()
    getReviews()
  },[])

  console.log('DATA BP>>>>>>', data.rating)
  // console.log('HOURS BP***', data.hours[0])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      <Carousel
          sliderWidth={screenWidth}
          data={data? data.photos : null}
          itemWidth={500}    
          renderItem={({item, index}) => {
            return (
              <View>
                <Image 
                  source={{uri: item}}
                  style={styles.image}
                />
              </View>
            )
          }}
      />
      <View style={styles.info}>
      <Rating
        type="star"
        ratingCount={5}
        fractions={5}
        startingValue={data ? data.rating: null}
        imageSize={40}
        showRating
        style={{ paddingVertical: 10 }}
      />
      </View>
      <View>
        {renderReviews}
      </View>
      <View style={styles.contact}>
        <Text style={styles.contact_details}>PHONE ETC </Text>
        <Text style={styles.contact_details}>PHONE ETC </Text>
        <Text style={styles.contact_details}>PHONE ETC </Text>
        <Text style={styles.contact_details}>PHONE ETC </Text>
        <View style={styles.buttons_container}>
          <TouchableOpacity style={styles.contact_button}>
            <Text>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contact_button}>
            <Text>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default BusinessPage