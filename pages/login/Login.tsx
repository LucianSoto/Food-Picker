import React from 'react'
import { Text, View, TouchableOpacity, } from 'react-native'

type Props = {}

export default function Login({navigation}: Props) {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity 
        style={styles.links}
        onPress={() => navigation.navigate('Register')}
      >
      <Text style={styles.links_txt}>Register</Text>
      </TouchableOpacity>
  </View>
  )
}

const styles = {
  links_cont: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },

  links: {

  },

  links_txt: {
    color: 'white',
  },
}