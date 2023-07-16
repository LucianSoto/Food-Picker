import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

type Props = {}

const Oauth = (props: Props) => {
  return (
    <View style={style.auth_cont}>
      <Text style={{color: 'white', marginBottom: 15}}>Or register with</Text>
      <Image 
        source={require('../../assets/images/goog_logo.png')}
        style={style.goog}
      />
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
    margin: 10,
  }
})

export default Oauth