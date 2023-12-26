// 'use client';
Icon.loadFont().catch((error) => {}); // or do nothing with the function?
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from "./screens/settings/Settings"
import Favorites from "./screens/favorites/Favorites"
import Home from "./screens/Home"
import Login from './screens/login/Login';
import BusinessPage from './screens/businessPage/BusinessPage';
import { ForgotPassword } from './screens/forgotPassword/ForgotPassword';
import Register from './screens/register/Register';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { setUser } from './redux/userSlice';
import {useDispatch, useSelector} from 'react-redux'
import auth from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
  
export const Routes = () => {  
  const dispatch = useDispatch() //THIS HAS TO GO INSIDE THE FUNCTION!!!!!
  const user = useSelector(state => state.user.data)
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user:any) {
    dispatch (setUser(user))  
    if (initializing) {setInitializing(false)}
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if(user) {
    // currently using onmountBlur: true to refresh screen when swithcing 
    // but maybe using redux would be better? To spread state across screens.
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
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <Icon 
                name="home"
                color={focused? 'white' : 'gray'}
                size={20}
              />
            )
          }}
        />
        <Tab.Screen 
          name="BusinessPage" 
          component={BusinessPage} 
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: "favorites",
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen 
          name="Favorites" 
          component={Favorites} 
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: "favorites",
            tabBarIcon: ({ focused }) => (
              <Icon 
                name="star"
                color={focused? 'white' : 'gray'}
                size={20}
              />
            )
          }}
        />
        <Tab.Screen 
          name='Settings' 
          component={Settings} 
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: "settings",
            tabBarIcon: ({ focused }) => (
              <Icon 
                name="gear"
                color={focused? 'white' : 'gray'}
                size={20}
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

