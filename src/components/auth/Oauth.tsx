import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import {useSelector} from 'react-redux'

type Props = {
  text: string,
}

// Important: To enable Google sign-in for your Android apps, you must provide the SHA-1 release fingerprint for each app (go to Project Settings > Your apps section).
const Oauth = (props: Props) => {
  const user = useSelector(state => state.user.data)
  const webClientId = process.env.WEB_CLIENT_ID
  const [initializing, setInitializing] = useState(true);

  useEffect(()=> {
    GoogleSignin.configure({
      webClientId: webClientId,
    });
  })

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {user: {}} = await GoogleSignin.signIn();      
      const {accessToken} = await GoogleSignin.getTokens()     
      const credential = await auth.GoogleAuthProvider.credential(
        user,
        accessToken,
      );
      await auth().signInWithCredential(credential)
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
        console.log(error)
      }
    }
  };

  return (
    <View style={style.auth_cont}>
      <Text style={{color: 'white', marginBottom: 15}}>{props.text}</Text>
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
  }
})

export default Oauth