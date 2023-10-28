import React , { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import auth from '@react-native-firebase/auth'

type Props = {
  // navigation: any,
}

const Settings = (props: Props) => {
  const logOut = () => {
    auth()
      .signOut()
      .then(()=> console.log('user signed out!'))
  }

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  )
}

export default Settings