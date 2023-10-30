// 'use client';

import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from "./screens/settings/Settings"
import Favorites from "./screens/favorites/Favorites"
import Home from "./screens/Home"
// make sure components default types are consistent
import Login from './screens/login/Login';
import { ForgotPassword } from './screens/forgotPassword/ForgotPassword';
import Register from './screens/register/Register';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { setUser } from './redux/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import auth from '@react-native-firebase/auth';

Icon.loadFont().catch((error) => { console.info(error); }); // or do nothing with the function?
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
  
export const Routes = () => {  
  const dispatch = useDispatch() //THIS HAS TO GO INSIDE THE FUNCTION!!!!!
  const user = useSelector(state => state.user.data)
  const [initializing, setInitializing] = useState(true);

  console.log('ROUTES')
  function onAuthStateChanged(user:any) {
    console.log('listening in ROUTES')
    dispatch (setUser(user))
    if (initializing) {setInitializing(false)}
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(user) {
    return(
      <Tab.Navigator initialRouteName='Home' 
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            backgroundColor: 'rgba(200,200,200, 0.1)',
            marginTop: 0,
            borderRadius: 20,
            marginHorizontal: 30,   
            height: 40, 
          },
          tabBarActiveTintColor: 'tomato',
          
          tabBarStyle: {
            backgroundColor: 'black',
            height: 80,
            paddingVertical: 10,
            paddingHorizontal: 20,
          },
        }}
      >
        <Tab.Screen 
          name='Home'         
          component={Home} 
          //CLEAR THIS LATER
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, size }) => (
              <Icon 
                name="home"
                color={focused? 'white' : 'gray'}
                size={size}
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
            tabBarIcon: ({ focused, size }) => (
              <Icon 
                name="star"
                color={focused? 'white' : 'gray'}
                size={size}
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
            tabBarIcon: ({ focused, size }) => (
              <Icon 
                name="gear"
                color={focused? 'white' : 'gray'}
                size={size}
              />
            )
          }} 
        />
      </Tab.Navigator>
    )
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot_Password" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

