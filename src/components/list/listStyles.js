import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  touch_image: {
    zIndex: 0,
  },
  thumb: {
    minWidth: 150,
    maxWidth: '35%',
    zIndex: 10,
    flex: 1,
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