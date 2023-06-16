import { Text, View, Image } from 'react-native'
import styled from 'styled-components'
import { useEffect } from 'react'

type Data = {
  name: string, 
  phone: string, 
  url: string, 
  image_url: string,
  distance: number, 
  rating: number
}

const Item = styled.View`
  margin: 10px;
  padding: 10px;
  
  background-color: white;
  font-size: 15px;

`

const List = (data: any) => {


const list = data.data.map((item: Data, i: number)=> {
  console.log(item)
  return (
    <Item key={i}>
      <Text>{item.name}</Text>
      <Image 
        style={{width: 50, height: 50}}
        source={{uri: item.image_url}}
      />
    </Item>
  )
})

  return (
    <View>
      <Text style={{fontSize: 20, }} >Your List</Text>
      {list}
    </View>
  )
}

export default List