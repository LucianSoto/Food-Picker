import { Text, View, Image } from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './listStyles'

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

const Item = styled.View`
  margin: 10px;
  padding: 10px;
  background-color: white;
  font-size: 15px;
  flexDirection: row;
  border-radius: 5px;
`

const List = (data: any) => { 
  const list = data.data.map((item: Data, i: number)=> {
    let getCategories = item.categories.map((category)=> {
      return (
        <Text style={styles.categories}>
          {category.title}
        </Text>
      )
    })
    return (
      <Item key={i}>
        <Image 
          style={{width: 175, height: 175}}
          source={{uri: item.image_url}}
          />
        <View style={styles.right_container}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>
            <Icon
              name="phone"
              color="black"
              size={15}
            />
            {/* deal with removing +1 on display */}
            {item.phone} 
          </Text>
          <Text>
            <Icon
              name="star"
              color="red"
              size={15}
            /> 
            {item.rating}
          </Text>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.categories_container}>{getCategories}</View>
        </View>
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

