import { View, Text, Image } from 'react-native'
import React from 'react'

type Props = {}

const Oauth = (props: Props) => {
  return (
    <View style={{height: "100%", width: '100%', alignItems: 'center',}}>
      <Text style={{color: 'white', marginBottom: 15}}>Or register with</Text>
      <Image 
        source={require('../../assets/images/goog_logo.png')}
        style={{width: '10%', height: '10%'}}
      />
    </View>
  )
}

export default Oauth