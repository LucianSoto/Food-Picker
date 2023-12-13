import {StyleSheet} from "react-native"

export default StyleSheet.create({
  search_container: {
    // flex: 1,
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
    height: 46,
    marginBottom: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    fontSize: 23,
    color: "white",
  },
  dropdown_input: {
    width: '91%',
    borderWidth: 1,
    fontSize: 13,
    color: "white",
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  dropdown: {
    minWidth: '100%', //// REQUIRED MIN WIDTH TO WORK  wait I guess it was not acutally needed, just needed to reset the environment >:(
    
  },
  dropdown_text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
})