import React, {useEffect, useState} from "react";
import { View, Text, TextInput } from 'react-native'
import {Slider} from '@miblanchard/react-native-slider'
import { SelectList } from "react-native-dropdown-select-list";
import styles from './searchStyles'

const Search = ({searchOptions, changeOptions}) => { // when passing multiple props don't need to do type checking
  console.log(searchOptions,changeOptions, 'SEARCH')
  const distanceData = [
    {key: '1', value: 1},
    {key: '2', value: 2},
    {key: '3', value: 3},
    {key: '4', value: 4},
    {key: '5', value: 5},
  ]
  const priceData = ['$', '$$', '$$$', '$$$$']

  const passSearchOptions = (options) => {
    changeOptions(options)
  }

  return (
    <View style={styles.search_container}>
      <Text style={styles.label}>Term</Text>
      <TextInput 
        style={styles.input}
        clearButtonMode='while-editing'
        placeholder='food, beer' //can multiple categories be used?
        placeholderTextColor={'gray'}
        onChangeText={text=> passSearchOptions(text)}
      /> 
      <Text style={styles.label}>Distance in miles  {searchOptions.distance}</Text>
      <Slider
        value={3}
        maximumTrackTintColor='gray'
        minimumTrackTintColor={'#c2003f'}
        maximumValue={10}
        minimumValue={1}
      />
      {/* change to slider */}
      <Text style={styles.label}>Limit</Text>
      <SelectList
        inputStyles={styles.dropdown_input}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdown_text}
        data={distanceData}
        setSelected={()=> console.log('working 1')}
        defaultOption={{key: '3', value: 3}}
      />
      <Text style={styles.label}>Price</Text>
      <SelectList
        inputStyles={styles.dropdown_input}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdown_text}
        data={priceData}
        setSelected={()=> console.log('Working 2')}
        defaultOption={{key: '2', value: '$$'}}// let see if this works when the function changes it from object to number
      />
      <Text style={styles.label}></Text>

      <Text style={styles.label}></Text>
    </View>
  )
}

export default React.memo(Search)