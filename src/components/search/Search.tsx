import React, {useEffect, useState} from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SelectList } from "react-native-dropdown-select-list";
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

  const distanceData = [
    1, 2, 3, 4, 5
  ]
  const priceData = [1, 2, 3, 4]

  return (
    <View style={styles.search_container}>
      <Text style={styles.label}>Distance</Text>
      <TextInput 
        style={styles.input}
        placeholder='1-10'
      /> 
      <Text style={styles.label}>Limit</Text>
      <SelectList
        inputStyles={{
    height: 60,
    width: 100,
    marginTop: 20,
    paddingLeft: 20,
    borderWidth: 1,
    fontSize: 13,
    color: "white",
        }}
        dropdownStyles={styles.input}
        data={distanceData}
        setSelected={()=> setSearchOptions(prevState => ({
          ...prevState,
          limit: 1000, // figure this out
        }))}
      />

      <Text style={styles.label}>Price</Text>
      <SelectList
        data={priceData}
        setSelected={()=> setSearchOptions(prevState => ({
          ...prevState,
          price: 2
        }))}
      />
      <Text style={styles.label}></Text>

      <Text style={styles.label}></Text>
    </View>
  )
}

export default React.memo(Search)