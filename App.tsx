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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './pages/Main'
import Settings from './pages/settings/Settings'
import Favorites from './pages/favorites/Favorites'
// import Icon from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome'
// import { Colors } from 'react-native/Libraries/NewAppScreen';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const Tab = createBottomTabNavigator()

  const tabScreenOptions = {headerShown: false}

  return (
    <NavigationContainer>
      {/* <SafeAreaView style={{backgroundColor: 'lightgray'}}> */}
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'red'}
        />
        <Tab.Navigator initialRouteName='Roulette' >
          <Tab.Screen 
            name='Roulette' 
            
            component={Main} 
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Icon 
                  name="home"
                  color={'red'}
                  size={28}
                />
              )
            }}
          />
          <Tab.Screen 
            name="Favorites" 
            
            component={Favorites} 
            options={{
              headerShown: false,
              tabBarLabel: "favorites",
              tabBarIcon: ({ color, size }) => (
                <Icon 
                  name="star"
                  color={'gold'}
                  size={28}
                />
              )
            }}
          />
          <Tab.Screen 
            name='Settings' 
            
            component={Settings} 
            options={{
              headerShown: false,
              tabBarLabel: "settings",
              tabBarIcon: ({ color, size }) => (
                <Icon 
                  name="gear"
                  color={'red'}
                  size={28}
                />
              )
            }} 
          />
        </Tab.Navigator>
      {/* </SafeAreaView> */}
    </NavigationContainer>
    
  );
}

export default App;
