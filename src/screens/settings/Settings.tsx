import React , { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

type Props = {
}

const Settings = (props: Props) => {
  const logOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();//REVOKE WAS MAKING IT NOT SIGN OUT
      await GoogleSignin.signOut();
      await auth().signOut()
        console.log('signed out')
    } catch (error) {
      console.error(error, 'SETTINGS');
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