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
      {/* change to slider */}
      <Text style={styles.label}>Limit</Text>
      <SelectList
        inputStyles={styles.dropdown_input}
        dropdownStyles={styles.dropdown}
        dropdownItemStyles={styles.dropdown_item}
        dropdownTextStyles={styles.dropdown_text}
        data={distanceData}
        setSelected={()=> setSearchOptions(prevState => ({
          ...prevState,
          limit: 1000, // figure this out
        }))}
        defaultOption={{key: '1', value: 1}}
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