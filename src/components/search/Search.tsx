import React, {useEffect, useState} from "react";
import { View, Text, TextInput } from 'react-native'
import {Slider} from '@miblanchard/react-native-slider'
import { SelectList } from "react-native-dropdown-select-list";
import styles from './searchStyles'
// DIT NOT NEED TO PUT THE TYPE FOR SEARCH OPTIONS UP HERE EITHER
const Search = ({searchOptions, changeOptions}) => { // when passing multiple props don't need to do type checking
  const distanceData = [
    {key: '1', value: 1},
    {key: '2', value: 2},
    {key: '3', value: 3},
    {key: '4', value: 4},
    {key: '5', value: 5},
  ]
  const priceData = ['$', '$$', '$$$', '$$$$']
  const sortByData = ['best_match', 'rating', 'review_count', 'distance']
  // const attributesData = ['hot_and_new', 'waitlist_reservation', 'outdoor_seating', 'parking_garage', 'etc']
  
  return (
    <View style={styles.search_container}>
      <Text style={styles.label}>Term</Text>
      <TextInput 
        style={styles.input}
        clearButtonMode='while-editing'
        placeholder='food, beer' //can multiple categories be used?
        placeholderTextColor={'gray'}
        enablesReturnKeyAutomatically={true}
        onChangeText={text=> changeOptions(text, 'term')}
      /> 
      <Text style={styles.label}>Distance in miles  {Math.floor(searchOptions.distance)}</Text>
      <Slider
        value={searchOptions.distance}
        maximumTrackTintColor='gray'
        minimumTrackTintColor={'#c2003f'}
        maximumValue={10}
        minimumValue={1}
        onValueChange={value => changeOptions(value, 'distance')}
      />
      {/* change to slider */}
      <Text style={styles.label}>Limit</Text>
      <SelectList
        inputStyles={styles.dropdown_input}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdown_text}
        data={distanceData}
        defaultOption={{key: '3', value: 3}}
        setSelected={value => changeOptions(value, 'limit')}
      />
      <Text style={styles.label}>Price</Text>
      <SelectList
        inputStyles={styles.dropdown_input}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdown_text}
        data={priceData}
        setSelected={value => changeOptions(value, 'price')}
        defaultOption={{key: '2', value: '$$'}}
      />
      <Text style={styles.label}>Sort By</Text>
      <SelectList
        inputStyles={styles.dropdown_input}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdown_text}
        data={sortByData}
        setSelected={value => changeOptions(value, 'sort_by')}
        defaultOption={{key: '2', value: '$$'}}
      />
      <Text style={styles.label}></Text>
    </View>
  )
}

export default React.memo(Search)