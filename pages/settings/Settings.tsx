import React , { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'

type Props = {
  navigation: any,
}

const Settings = (props: Props) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const {navigation} = props

  const onAuthStateChanged = (user:any) => {
    setUser(user)
    if(initializing) setInitializing(false)
  }

  useEffect(()=> {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  useEffect(()=> {
    console.log(user, 'in useEffect')
  }, [user])

  // if(user) {navigation.navigate('Home')}
  // else if(!user) {navigation.navigate('Login')}

  const logOut = () => {
    console.log('logging out'),
    auth()
      .signOut()
      .then(()=> console.log('user signed out!'))
      navigation.navigate('Login')
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