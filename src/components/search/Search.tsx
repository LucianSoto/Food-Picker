import React, {useEffect, useState} from "react";
import { View, Text, TextInput } from 'react-native'
import {Slider} from '@miblanchard/react-native-slider'
import { SelectList } from "react-native-dropdown-select-list";
import styles from './searchStyles'
import {setSearchOptions} from '../../redux/searchOptionsSlice'
import {useDispatch, useSelector} from 'react-redux'
// DIT NOT NEED TO PUT THE TYPE FOR SEARCH OPTIONS UP HERE EITHER
const Search = () => { // when passing multiple props don't need to do type checking
  const searchOptions = useSelector(state => state.searchOptions.data)
  const dispatch = useDispatch()
  
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
        onChangeText={data=> dispatch(setSearchOptions(
          {data, name: 'term'}
        ))}
      /> 
      <Text style={styles.label}>Distance in miles  {
        searchOptions.distance[0] === 10 ? 10 :
        searchOptions.distance[0] === 1 ? 1 :
        searchOptions.distance[0].toFixed(1) 
      }
      </Text>
      <Slider
        value={searchOptions.distance}
        maximumTrackTintColor='gray'
        minimumTrackTintColor={'#c2003f'}
        maximumValue={10}
        minimumValue={1}
        onValueChange={value => dispatch(setSearchOptions({
          data: value, name: 'distance'}
        ))}
        />
      <Text style={styles.label}>Limit</Text>
      <SelectList
        inputStyles={styles.dropdown_input}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdown_text}
        data={limitData}
        setSelected={value => dispatch(setSearchOptions({
          data: value, name: 'limit'
        }))}
        defaultOption={{key: searchOptions.limit, value: searchOptions.limit}}
        />
      <Text style={styles.label}>Price</Text>
      <SelectList
        inputStyles={styles.dropdown_input}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdown_text}
        data={priceData}
        setSelected={value => dispatch(setSearchOptions({
          data: value, name: 'price'
        }))}
        defaultOption={priceData[2]}
        />
        {/* 
      <Text style={styles.label}>Sort By</Text>
      <SelectList
        inputStyles={styles.dropdown_input}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdown_text}
        data={sortByData}
        setSelected={value => changeOptions(value, 'sortBy')}
        defaultOption={{key: 'best_match', value: 'Best Match'}}
      /> */}
      {/* <Text style={styles.label}></Text> */}
    </View>
  )
}

export default React.memo(Search)

const limitData = [
    {key: '1', value: 1},
    {key: '2', value: 2},
    {key: '3', value: 3},
    {key: '4', value: 4},
    {key: '5', value: 5},
  ]
  const priceData = [
    {key: '$', value: '$'}, 
    {key: '$$', value: '$$'},
    {key: '$$$', value: '$$$'}, 
    {key: '$$$$', value: '$$$$'},
  ]
  const sortByData = [
    {key: 'best_match', value: 'Best Match'},
    {key: 'rating', value: 'Rating'},
    {key: 'review_count', value: 'Review Count'},
    {key: 'distance', value: 'Distance'},
  ]

