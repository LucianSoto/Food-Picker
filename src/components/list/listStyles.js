import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  thumb: {
    minHeight: 190,
    minWidth: 190,
  },
  right_container: {
    marginLeft: 20,
    height: 190,
    width: '40%',
    justifyContent: "space-around",
    // alignItems: "stretch",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 7,
    width: '100%',
  },
  price: {
    fontWeight: '900',
  },
  categories_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '100%',
    maxHeight: 150,
  },
  categories: {
    backgroundColor: 'lightgray',
    color: 'white',
    margin: 3,
    paddingHorizontal: 3,
    borderRadius: 5,
  },
})