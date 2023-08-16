import EStyleSheet from 'react-native-extended-stylesheet'

export default EStyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '$mainColor_black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sub_heading: {
    fontSize: 30,
    fontWeight: 600,
    alignItems: 'center',
    color: '$mainColor_white',
    marginBottom: 70,
  },  

  input: {
    height: 50,
    width: "80%",
    margin: 10,
    marginLeft: 0,
    borderWidth: 1,
    borderColor: '$mainColor_white',
    paddingLeft: 20,
    borderRadius: 30,
    fontSize: 20,
    color: "white",
  },

  submit: {
    marginVertical: 30,
    width: '80%',
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
  },

  links_cont: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },

  links_txt: {
    color: 'white',
  },

  modal: {
    flex: 1,
  }
  
})
