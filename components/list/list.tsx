import { Text, View, Image } from 'react-native'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'

type Data = {
  name: string, 
  phone: string, 
  url: string, 
  image_url: string,
  distance: number, 
  rating: number,
  price: string,
  categories: string,
}

const Item = styled.View`
  margin: 10px;
  padding: 10px;
  background-color: white;
  font-size: 15px;
  flexDirection: row;

`

const List = (data: any) => { 
  // console.log(data.data[3].categories)
  const list = data.data.map((item: Data, i: number)=> {
    // console.log(item.categories[0].title, 'here')
    let getCategories = item.categories.map((cat)=> {
      console.log(cat.title)
      return cat.title + ', '
    })
    return (
      <Item key={i}>
        <Image 
          style={{width: 175, height: 175}}
          source={{uri: item.image_url}}
          />
        <View>
          <Text>{item.name}</Text>
          <Text>
            <Icon
              name="phone"
            />
            {/* deal with removing +1 on display */}
            {item.phone} 
          </Text>
          <Text>
            <Icon
              name="star"
            /> 
            {item.rating}
          </Text>
          <Text>{item.price}</Text>
          <Text>{getCategories}</Text>
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