import { Text, View, Image, ImageStyle, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './listStyles'
import firestore from '@react-native-firebase/firestore';

Icon.loadFont().catch((error) => { console.info(error); });

type Data = {
  name: string, 
  phone: string, 
  url: string, 
  image_url: string,
  distance: number, 
  rating: number,
  price: string,
  categories: [{title: string}],
}

const List = (data: any) => { 
  const addToFavs = async (name: string) => {
    firestore()
      .collection('User_Favorites')
      .doc('ABC')
      .set({
        name: name,
      })
      .then(() => {
        console.log('User added!');
      });
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
      <Item key={i}>
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
        <TouchableOpacity onPress={()=> addToFavs(item.name)}>
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