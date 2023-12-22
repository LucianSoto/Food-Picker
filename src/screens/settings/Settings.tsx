import React , { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import EStyleSheet from 'react-native-extended-stylesheet'

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
    <View style={styles.main_container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity 
        style={styles.logout} 
        onPress={() => logOut()}
      >
        <Text 
          style={styles.logout_txt}
        >LOG OUT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings

const styles = EStyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '$mainColor_black',
    alignItems: 'center',
    // justifyContent: 'center',
    color: 'white',
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginVertical: 20,
    marginBottom: 300,
  },

  logout: {
    backgroundColor: '$mainColor_magenta',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  logout_txt: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  }
})