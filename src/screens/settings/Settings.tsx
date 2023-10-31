import React , { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

type Props = {
}

const Settings = (props: Props) => {
  const logOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => console.log('Your are signed out!'));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <Text>Settings</Text>
      <TouchableOpacity 
        // style={styles.links} 
        style={{backgroundColor: "red"}}
        onPress={() => logOut()}
      >
        <Text 
          // style={styles.links_txt}
        >LOG OUT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings