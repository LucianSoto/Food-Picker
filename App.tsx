/**
 * @format
 */
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect } from 'react'
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tabs } from './Tabs'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import { ForgotPassword } from './pages/forgotPassword/ForgotPassword';
import EStyleSheet from 'react-native-extended-stylesheet'

function App(): JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator()
  
  useEffect(()=> {
    // do stuff while splash screen is shown After having done stuff (such as async tasks) hide the splash screen
    console.log('closing splash APP TSX',)
    SplashScreen.hide();
  },[])

  return (  
    <NavigationContainer>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={EStyleSheet.value('$mainColor_magenta')}
        />
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Forgot_Password" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

EStyleSheet.build({
  $mainColor_white: '#d9d9d9',
  $mainColor_black: '#050102',
  $mainColor_magenta: '#c2003f',
})
