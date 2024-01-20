import React, {useEffect, useRef} from 'react'
import { View, Image, Text, Animated } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

const Loader = (props) => {
  const anim = useRef(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: 1.5, 
          duration: 300,
          useNativeDriver: false,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1, 
          duration: 300,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);
  
  return (
    <View style={{
      flex: 1, 
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      }}
    >
      <Animated.Image
        style={{ transform: [{ scale: anim.current }]}}
        source={require('../../assets/images/logo_sm.png')}
        height={200}
        width={200}
      />
    </View>
  )
}

export default Loader