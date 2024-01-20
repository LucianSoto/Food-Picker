import React , { useState, useEffect } from 'react'
import { View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  Image,
  ScrollView,
} from 'react-native'
// import FastImage from 'react-native-fast-image' ALTERNATIVE TO LOAD IMAGES FASTER/BETTER
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Carousel from 'react-native-reanimated-carousel';
import Carousel from 'react-native-snap-carousel';
import styles from './businessPageStyles'
import {Rating, AirbnbRating} from 'react-native-ratings'
import Loader from '../../components/loader/Loader'
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
  const categories = []
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
  
  if (data.length) {
    data.categories
     .map((category: {title: string}, i:number)=> {
       categories.push(category.title)
     }) 
  } 

  useEffect(()=> {
    getData()
    getReviews()
  },[])


  console.log('DATA BP>>>>>>', data.categories)
  console.log(categories, 'categories BG **')
  // console.log('HOURS BP***', data.hours[0])
  if(!reviews.length) {
    return (
      <Loader/>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      <Carousel
          sliderWidth={screenWidth}
          data={data? data.photos : null}
          itemWidth={screenWidth} 
          itemHeight={600}   
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
      <ScrollView>
        <View style={styles.ratings_container}>
          <Rating
            ratingBackgroundColor=''
            type="star"
            ratingCount={5}
            fractions={5}
            startingValue={data ? data.rating: null}
            imageSize={30}
            style={{ paddingVertical: 10 }}
          />
          <Text style={styles.rating_text}>4.9</Text>
        </View>
        <View>
          <Text style={styles.contact_details}>PHONE ETC </Text>
          <Text style={styles.contact_details}>PHONE ETC </Text>
          <Text style={styles.contact_details}>PHONE ETC </Text>
          <Text style={styles.contact_details}>PHONE ETC </Text>
        </View>
        {/* <View> */}
          {renderReviews}
        {/* </View> */}
      </ScrollView>
      <View style={styles.buttons_container}>
        <TouchableOpacity style={styles.contact_button}>
          <Text style={styles.button_text}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contact_button}>
          <Text style={styles.button_text}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BusinessPage