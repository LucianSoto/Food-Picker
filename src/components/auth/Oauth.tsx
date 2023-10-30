import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import {useDispatch, useSelector} from 'react-redux'
import { setUser } from '../../redux/userSlice';

type Props = {
  text: string,
}

// Important: To enable Google sign-in for your Android apps, you must provide the SHA-1 release fingerprint for each app (go to Project Settings > Your apps section).

const Oauth = (props: Props) => {
  const dispatch = useDispatch() //THIS HAS TO GO INSIDE THE FUNCTION!!!!!
  const user = useSelector(state => state.user.data)
  const webClientId = process.env.WEB_CLIENT_ID
  const [initializing, setInitializing] = useState(true);

  GoogleSignin.configure({
    webClientId: webClientId,
  });

  function onAuthStateChanged(user:any) {
    console.log('listening in OaUTH')
    dispatch (setUser(user))
    if (initializing) {setInitializing(false)}
  }

  useEffect(() => {
    console.log('insubscriber, OAUTH')
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const idToken: any = await GoogleSignin.signIn();
      console.log(idToken, 'in OAUTH 1st')
      // setUser({ userInfo });
      dispatch (setUser(idToken))
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
        // some other error happened
      }
    }
  };

  console.log(user, 'in OAUTH, 2nd')

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