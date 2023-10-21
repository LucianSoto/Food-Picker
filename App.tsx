/**
 * @format
 */
import React, { useEffect } from 'react'
import {
  StatusBar,
  View,
  SafeAreaView,
  useColorScheme,
  StyleSheet,
} from 'react-native';
// Do I need to import platform for react-native?? seems to be working fine w/o it.
import { useSafeAreaInsets, SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from 'react-native-splash-screen'
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
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  },[])
  
  const CustomStatusBar = ({backgroundColor}) => { 
    const insets = useSafeAreaInsets();
    return (
      <View style={{ height: insets.top, backgroundColor }}>
        <StatusBar
          animated={true}
          backgroundColor={backgroundColor}
        />
      </View>
    );
  }

  return (  
    <SafeAreaProvider>
      <NavigationContainer>
        <CustomStatusBar backgroundColor={EStyleSheet.value('$mainColor_magenta')} />
        <Stack.Navigator screenOptions={{headerShown: false}} >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Forgot_Password" component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

EStyleSheet.build({
  $mainColor_white: '#d9d9d9',
  $mainColor_black: '#050102',
  $mainColor_magenta: '#c2003f',
})

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});