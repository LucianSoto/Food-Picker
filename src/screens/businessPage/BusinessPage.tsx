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
import Carousel, {Pagination} from 'react-native-snap-carousel';
import styles from './businessPageStyles'
import {Rating} from 'react-native-ratings'
import Loader from '../../components/loader/Loader'
import Icon from 'react-native-vector-icons/FontAwesome'
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux'
{/* <Text > */}// TO MAKE PHONE CALLS
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
  const user = useSelector(state => state.user.data)
  const id = props.route.params.id
  const userId = user.uid
  const collectionRef = firestore().collection('users')
  const [favorites, setFavorites] = useState([])
  const today = new Date().getDay()
  const timeOpen = data.hours ? data.hours[0].open[today].start : null
  const timeClose = data.hours ? data.hours[0].open[today].end : null
  let categories = []
  
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

  const getFavs = async () => {
    const favs = await collectionRef
      .where('userRef', '==', userId)
      .get()
      .then(querySnapShot => {
        return querySnapShot.docs[0].data().favorites
      });
    setFavorites(favs)
  }
  
  useEffect(()=> {
    getFavs()
  },[])

  const toggleFavs = async (bussinessID: string) => {
    try {
      const query = await collectionRef.where('userRef', '==', id).get();
      const snapshot = query.docs[0] // gotta break this and the next function in two for it to work
      const favorites = await snapshot.data().favorites
      const checkFavorite = favorites.includes(bussinessID)

      if (checkFavorite) {
        const removedFav = await favorites.filter(n => n !== bussinessID)
        const updating = await query.forEach((doc) => {
          doc.ref.update({
            favorites: removedFav
          })
        })
      } else {
        const addFav = await favorites.push(bussinessID)
        const updating = await query.forEach((doc) => {
          doc.ref.update({
            favorites: favorites
          })
        })
      }
    } catch (error) {
      console.log(error)
    } 
    getFavs()
  }

  const renderReviews = reviews.map((review, i) => {
    return (
      <Text key={i} style={styles.review}>{review.text}</Text>
    )
  })
  
  if (data.categories) {
    data.categories
     .map((category: {title: string}, i:number)=> {
      categories.push(category.title)
     }) 
  } 

  useEffect(()=> {
    getData()
    getReviews()
  },[])

  const toStandardTime = (time) => {
    console.log('to standardtime', time)
    time = time.slice(0, 2) + ':' + time.slice(2)
    console.log(time,' BP time')
    time = time.split(':')
    return (time[0].charAt(0) == 1 && time[0].charAt(1) > 2) ? (time[0] - 12) + ':' + time[1] + ':' + time[2] + ' PM' : time.join(':') + ' AM'
  }

  // console.log('DAY BP ***', data.photos.length)
  
  if(!reviews.length && !data.hours) { // DO SOMETHING ABOUT LOADING 
    return (
      <Loader/>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.name}</Text>
        <TouchableOpacity onPress={()=> toggleFavs(data.id)}>
          <Icon 
            name={ favorites.includes(data.id)? 'heart' : 'heart-o' }
            color='#c2003f'
            size={30}
            style={styles.icon}
            />
        </TouchableOpacity>
      </View>
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
      <Pagination 
        dotsLength={data.photos? data.photos.length: null}
        dotStyle={{
          width: 10,
          // borderRadius: 10,
          // : 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotColor='gray'
        inactiveDotOpacity={0.4}
      />
      <ScrollView>
        <View style={styles.ratings_container}>
          <Rating
            type="star"
            ratingCount={5}
            fractions={5}
            startingValue={data ? data.rating: null}
            imageSize={30}
            tintColor='black'
            style={{ paddingVertical: 10, backgroundColor: 'black' }}
          />
          <Text style={styles.rating_text}>{data.rating}</Text>
          <Text style={styles.rating_text}>({Number(data.review_count).toLocaleString()} reviews)</Text>
        </View>
        <View style={styles.price_cats_container}>
          <Text style={styles.price_categories}>
            {data.price}  · 
          </Text>
          <Text style={styles.price_categories}>  {categories.join(', ')}
          </Text>
        </View>
        <View style={styles.hours_container}>
          { 
            data.hours ? data.hours[0].is_open_now ? 
              <Text style={[styles.hours, styles.open]}>Open   </Text> :
              <Text style={[styles.hours, styles.closed]}>Closed  </Text>
              : null
          }
          <Text style={styles.hours}> {data.hours ? toStandardTime(timeOpen) : null}  -  </Text>
          <Text style={styles.hours}>{data.hours ? toStandardTime(timeClose) : null}</Text>
        </View>
          
          {renderReviews}
      </ScrollView>
      <View style={styles.buttons_container}>
        <TouchableOpacity 
          style={styles.contact_button}
          // onPress={()=>{Linking.openURL(`tel:${item.phone}`)}}
        >
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