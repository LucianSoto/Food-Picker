import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '$mainColor_black',
  },

  sub_heading: {
    fontSize: 20,
    fontWeight: 600,
    marginVertical: 20,
    alignItems: 'center',
    color: '$mainColor_white',
  },  

  form: {
    width: '90%',
    // flexDirection: 'column',
    // alignItems: 'center',
  },

  input: {
    height: 50,
    width: "100%",
    margin: 10,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: 'white',
    paddingLeft: 20,
    borderRadius: 30,
    fontSize: 23,
    color: "$mainColor_black",
  },

  submit: {
    marginVertical: 25,
    width: '100%',
    padding: 9,
    backgroundColor: '$mainColor_magenta',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'relative',
    bottom: 0,
  },

  submit_text: {
    color: '$mainColor_white',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 5,
  }
})

// make button component?