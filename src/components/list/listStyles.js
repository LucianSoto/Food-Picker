import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  thumb: {
    minWidth: 150,
    maxWidth: '35%',
  },
  right_container: {
    marginLeft: 20,
    height: 190,
    width: '50%',
    justifyContent: "space-around",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    width: '100%',
  },
  price: {
    fontWeight: '900',
  },
  categories_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxHeight: 65,
  },
  categories: {
    backgroundColor: 'lightgray',
    color: 'white',
    margin: 3,
    paddingHorizontal: 3,
    borderRadius: 5,
  },
})