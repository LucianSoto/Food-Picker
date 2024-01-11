import { StyleSheet } from "react-native"
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  title: {
    fontSize: 30,
    color: 'white',
    margin: 15,
  },
  image: {
    height: screenWidth - 30, 
    width: screenWidth
  },
  info: {
    
  },
  reviews_contianer: {
  },
  review: {
    color: 'white',
    marginHorizontal: 10,
    marginVertical: 20,
  },


  contact: {
    //static ()
    position: 'fixed',
  },
  contact_details: {
    color: 'white',
    borderTopColor: 'white',
    borderTopWidth: 1,
  },
  buttons_container: {
    flexDirection: 'row',
    width: screenWidth,
  },
  contact_button: {
    color: 'white',
    backgroundColor: 'magenta',
    borderRadius: 30,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

})