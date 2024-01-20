import { StyleSheet } from "react-native"
import EStyleSheet from 'react-native-extended-stylesheet'
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    margin: 15,
  },
  image: {
    height: screenWidth, 
    width: screenWidth - 3,
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
  info: {

  },
  contact_details: {
    color: 'white',
    borderTopColor: 'white',
    borderTopWidth: 1,
  },
  ratings_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating_text: {
    color: 'lightgray',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  buttons_container: {
    flexDirection: 'row',
    width: screenWidth,
    justifyContent: 'space-around',
    position: 'fixed',
  },
  contact_button: {
    color: 'white',
    backgroundColor: '$mainColor_magenta',
    borderRadius: 30,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 150,
    
  },
  button_text: {
    color: '$mainColor_white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})