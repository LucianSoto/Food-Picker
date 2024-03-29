Icon.loadFont().catch((error) => {});
import { Text, View, Image, ImageStyle, TouchableOpacity, Linking, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './listStyles'
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux'

type Data = {
  data: {
    name: string, 
    phone: string, 
    url: string, 
    image_url: string,
    distance: number, 
    rating: number,
    price: string,
    categories: [{title: string}],
    id: string,
  },
  navigation: any
} // globalize

const List = (props: Data,) => { 
  // console.log( props.navigation, 'LIST') // perhaps need to pass down nav to this component
  const user = useSelector(state => state.user.data)
  const [favorites, setFavorites] = useState([])
  const collectionRef = firestore().collection('users')
  const id = user.uid
  const data = props.data
  const navigation = props.navigation

  const getFavs = async () => {
    const favs = await collectionRef
      .where('userRef', '==', id)
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

  const list = data.map((item: Data, i: number)=> { // destructure data
    let getCategories = item.categories
    .map((category: {title: string}, i:number)=> {
      return (
        <Text key={i} style={styles.categories}>
          {category.title}
        </Text>
      )
    }) 
   
    return (
      <Item key={i} id={item.id} >
        <Pressable 
          onPress={()=> navigation.navigate('BusinessPage', {id: item.id})}
          style={styles.touch_image}
        >
          <Image 
            style={styles.thumb as ImageStyle} // had to add type for typescript compiling.
            source={{uri: item.image_url}}
          />
        </Pressable>
        <View style={styles.right_container}>
          <Pressable>
            <Text 
            onPress={()=> navigation.navigate('BusinessPage', {id: item.id})}
            style={styles.name}
            >
              {item.name}
            </Text>
          </Pressable>
          <Text onPress={()=>{Linking.openURL(`tel:${item.phone}`);}}>
            <Icon
              style={{marginRight: 20}}
              name="phone"
              color="black"
              size={15}
              />
            {item.phone.replace(/^[\s\S]{0,2}/g, "  ")} 
          </Text>
          <View style={{flexDirection: "row"}}>
            <Icon
              name="star"
              color='#c2003f'
              size={15}
              /> 
            <Text>  {item.rating} </Text>
            <Text style={styles.rating_text}> ({Number(item.review_count).   toLocaleString()} reviews)</Text>
          </View>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.categories_container}>
            {getCategories}
          </View>
        </View>
        <TouchableOpacity onPress={()=> toggleFavs(item.id)}>
          <Icon 
            name={ favorites.includes(item.id)? 'heart' : 'heart-o' }
            color="red"
            size={20}
            />
        </TouchableOpacity>
      </Item>
    )
  })

  return (
    <View>
      {list}
    </View>
  )
}

export default List

const Item = styled.View`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  background-color: white;
  flexDirection: row;
  border-radius: 5px;
`