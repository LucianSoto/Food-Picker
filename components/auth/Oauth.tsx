import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
// @react-native-firebase/app
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth'

type Props = {
  text: string
}


const Oauth = (props: Props) => {
  
  // GoogleSignin.configure({
  //   webClientId: '472888646819-96no2ertkgn045l9vtcavd1trafj8ccm.apps.googleusercontent.com',
  // });
  const {text} = props

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn()
    const googleCredentail = auth.GoogleAuthProvider.credential(idToken)

    return auth().signInWithCredential(googleCredentail)
  }

  return (
    <View style={style.auth_cont}>
      <Text style={{color: 'white', marginBottom: 15}}>{text}</Text>
      {/* <GoogleSigninButton 
        
        size={5}
        onPress={()=> onGoogleButtonPress().then(()=> console.log('singin in with google'))}
      /> */}
      <TouchableOpacity 
        onPress={()=> onGoogleButtonPress().then(()=> console.log('singin in with google'))}
      >
        <Image 
          source={require('../../assets/images/goog_logo.png')}
          style={style.goog}
        />
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  auth_cont: {
    height: "100%", 
    width: '100%', 
    alignItems: 'center', 
    flex: 1, 
    marginBottom: 30,
  },

  goog: {
    height: 60,
    width: 59,
    // margin: 10,
  }
})

export default Oauth