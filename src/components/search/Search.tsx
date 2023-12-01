import React, {useEffect, useState} from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './searchStyles'

const Search = () => {
  const [searchOptions, setSearchOptions] = useState<Object>({
    distance: '2000', // 1 - 5
    limit: 5,  // 1- 2
    price: null, // int or string?
    term: '',
    attributes: '',
    openNow: true,
  })


  return (
    <View style={styles.search_container}>
      
    </View>
  )
}

export default React.memo(Search)