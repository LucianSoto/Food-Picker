import { Text, View, Image } from 'react-native'
import styled from 'styled-components'

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

const List = (data: any) => { // need to set data to use type Data
  const list = data.data.map((item: Data, i: number)=> {
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
      {list}
    </View>
  )
}

export default List