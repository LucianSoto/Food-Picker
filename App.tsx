/**
 * @format
 */
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect, useState } from 'react'
import type {PropsWithChildren} from 'react'
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import EStyleSheet from 'react-native-extended-stylesheet'
import Oauth from '../../components/auth/Oauth'
import auth from '@react-native-firebase/auth'

function App(): JSX.Element {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator()
  const tabScreenOptions = {headerShown: false}
  
  useEffect(()=> {
    // do stuff while splash screen is shown After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  },[])

  const onAuthStateChanged = (user) => {
    setUser(user)
    if(initializing) setInitializing(false)
  }

  useEffect(()=> {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  return (
    <NavigationContainer>
      {/* <SafeAreaView style={{backgroundColor: 'lightgray'}}> */}
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={EStyleSheet.value('$mainColor_magenta')}
        />
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
        
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

export default App;

EStyleSheet.build({
  $mainColor_white: '#d9d9d9',
  $mainColor_black: '#050102',
  $mainColor_magenta: '#c2003f',
})
