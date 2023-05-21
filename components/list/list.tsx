import { Text, View } from 'react-native'
import { useEffect } from 'react'


const List = (data) => {



// const list = data.map((i) => console.log(i))

console.log(data[0], '1111')

  return (
    <View>
      <Text>List</Text>
      {/* {list && list} */}
      <Text>{data[0]}</Text>
    </View>
  )
}

export default List