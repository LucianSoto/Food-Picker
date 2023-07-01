/**
 * @format
 */
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './pages/Main'
import Settings from './pages/settings/Settings'
// import { Colors } from 'react-native/Libraries/NewAppScreen';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator()

  const tabScreenOptions = {headerShown: false}

  return (
    <NavigationContainer>
      {/* <SafeAreaView style={{backgroundColor: 'lightgray'}}> */}
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'#ff1a1a'}
        />
        <Tab.Navigator initialRouteName='Roulette' >
          <Tab.Screen name='Roulette' component={Main} options={tabScreenOptions}/>
          <Tab.Screen name='Settings' component={Settings} options={tabScreenOptions} />
        </Tab.Navigator>
      {/* </SafeAreaView> */}
    </NavigationContainer>
    
  );
}

export default App;
