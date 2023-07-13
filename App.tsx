/**
 * @format
 */
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect } from 'react'
import type {PropsWithChildren} from 'react'
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
// import Icon from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome'
// import { Colors } from 'react-native/Libraries/NewAppScreen'


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator()
  const tabScreenOptions = {headerShown: false}
  
  useEffect(()=> {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  },[])

  return (
    <NavigationContainer>
      {/* <SafeAreaView style={{backgroundColor: 'lightgray'}}> */}
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'red'}
        />
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
        
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

export default App;
