import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from "./pages/settings/Settings"
import Favorites from "./pages/favorites/Favorites"
import {Home} from "./pages/Home"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import EStyleSheet from 'react-native-extended-stylesheet';

Icon.loadFont().catch((error) => { console.info(error); });

type Props = {
  navigation: any,
  state: any,
  descriptions: any,
}

export const Tabs = (props: Props) => {
  const Tab = createBottomTabNavigator()

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
        style={{background: 'red'}}
        name='HomeScreen'         
        component={Home} 
        //CLEAR THIS LATER
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Icon 
              name="home"
              color={focused? 'white' : 'gray'}
              size={25}
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
              size={25}
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
              size={25}
            />
          )
        }} 
      />
    </Tab.Navigator>
  )
}

