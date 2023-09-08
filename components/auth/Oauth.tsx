import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
// @react-native-firebase/app
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'

type Props = {
  text: string,
  navigation: any
}

GoogleSignin.configure();

const Oauth = (props: Props) => {
  const [user, setUser] = useState<{}>([])
  const {navigation} = props
  // GoogleSignin.configure({
  //   webClientId: '472888646819-96no2ertkgn045l9vtcavd1trafj8ccm.apps.googleusercontent.com',
  // });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo: any = await GoogleSignin.signIn();
      setUser({ userInfo });
      navigation.navigate('Home')
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  console.log(navigation)

  // const {text} = props
  useEffect(()=> {
    const getCurrentUser = async () => {
      const currentUser = await GoogleSignin.getCurrentUser();
      setUser({ currentUser });
    };
    
    getCurrentUser()
  })

  // if(user) {navigation.navigate('Home')}

  // useEffect(()=> {
  //   if(user) {navigation.navigate('Home')}
  // },[user])

  console.log(user)
  return (
    <View style={style.auth_cont}>
      <Text style={{color: 'white', marginBottom: 15}}>{text}</Text>
      {/* <GoogleSigninButton 
        
        size={5}
        onPress={()=> onGoogleButtonPress().then(()=> console.log('singin in with google'))}
      /> */}
      <TouchableOpacity 
        onPress={()=> signIn()}
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