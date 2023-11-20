import { Text, View, Image, ImageStyle, TouchableOpacity } from 'react-native'
import {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './listStyles'
import firestore from '@react-native-firebase/firestore';
// import {updateDoc, doc, collection, query, where, orderBy} from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
// import getDoc from '@react-native-firebase/firestore'
import {useDispatch, useSelector} from 'react-redux'

Icon.loadFont().catch((error) => { console.info(error); });
// see if each restaurant has its own iD from Yelp
// get user data

type Data = {
  name: string, 
  phone: string, 
  url: string, 
  image_url: string,
  distance: number, 
  rating: number,
  price: string,
  categories: [{title: string}],
  id: string,
}

const List = (data: any) => { 
  const user = useSelector(state => state.user.data)
  const [favorites, setFavorites] = useState([])
  const userRef = ''
  const collection = firestore().collection('users')


  const getFavs = async () => {
    // Also gets called by toggle favs
    const id = await user.uid
    const favs = await collection
      .where('userRef', '==', id)
      .get()
      .then(querySnapShot => {
        return querySnapShot.docs[0].data().favorites
      });
      
    console.log(favs, 'LIST FAVES')
    const settingFavs = setFavorites(favs)
  }

  console.log(favorites, 'favorites LIST')

  useEffect(()=> {
    getFavs()
  },[])

  const toggleFavs = async (bussinessID: string) => {

    // const toggleFav = await 
    getFavs()
  }
  
  const list = data.data.map((item: Data, i: number)=> {
    let getCategories = item.categories.map((category: {title: string}, i:number)=> {
      return (
        <Text key={i} style={styles.categories}>
          {category.title}
        </Text>
      )
    }) 
   
    return (
      <Item key={i} id={item.id}>
        <Image 
          style={styles.thumb as ImageStyle} // had to add type for typescript compiling.
          source={{uri: item.image_url}}
          />
        <View style={styles.right_container}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>
            <Icon
              style={{marginRight: 20}}
              name="phone"
              color="black"
              size={15}
              />
            {/* deal with removing +1 on display */}
            {item.phone.replace(/^[\s\S]{0,2}/g, "  ")} 
          </Text>
          <View style={{flexDirection: "row"}}>
            <Icon
              name="star"
              color="red"
              size={15}
              /> 
            <Text>  {item.rating}</Text>
          </View>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.categories_container}>{getCategories}</View>
        </View>
        <TouchableOpacity onPress={()=> toggleFavs(item.id)}>
          <Icon 
            name="heart-o"
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
  margin: 10px;
  padding: 10px;
  background-color: white;
  font-size: 15px;
  flexDirection: row;
  border-radius: 5px;
`