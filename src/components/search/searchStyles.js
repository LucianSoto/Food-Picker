import {StyleSheet} from "react-native"

export default StyleSheet.create({
  search_container: {
    flex: 1,
    width: '85%', // fix width problems this is only temp
    color: 'white',
    marginTop: 15,
  },
  label: {
    color: 'white',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
  },
  input: {
    flex: 1,
    height: 48,
    // width: '100%', // how to make even across screen?
    marginBottom: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    fontSize: 23,
    color: "white",
  },
  dropdown_input: {
    width: '100%',
    borderWidth: 1,
    fontSize: 13,
    color: "white",
    marginHorizontal: 5,
  },
  dropdown: {
    flex: 1,
    minWidth: '100%', //// REQUIRED MIN WIDTH TO WORK 
    backgroundColor: 'orange',
  },
  dropdown_item: {
    width: '100%',
    backgroundColor: 'yellow',
  },
  dropdown_text: {
    color: 'white',
    textAlign: 'center',
  }
})