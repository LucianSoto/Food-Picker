import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  right_container: {
    marginLeft: 10,
    height: 165,
    justifyContent: "space-around",
    // alignItems: "stretch",
  },
  name: {
    fontSize: 18,
    maxWidth: 160,
    fontWeight: 900,
    color: "black",
    marginBottom: 7,
  },
  price: {
    fontWeight: 900,
  },
  categories_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 150,
  },
  categories: {
    backgroundColor: 'lightgray',
    color: 'white',
    margin: 3,
    paddingHorizontal: 3,
    borderRadius: 5,
  },
})