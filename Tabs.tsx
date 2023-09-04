import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from "./pages/settings/Settings"
import Favorites from "./pages/favorites/Favorites"
import Main from "./pages/Home"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import EStyleSheet from 'react-native-extended-stylesheet';

export const Home = () => {
  const Tab = createBottomTabNavigator()

  return(
    <Tab.Navigator initialRouteName='Roulette' 
      screenOptions={{
        tabBarLabelStyle: {
          // backgroundColor: 'black',
        },
        tabBarShowLabel: false,
        tabBarItemStyle: {
          backgroundColor: 'rgba(200,200,200, 0.1)',
          marginTop: 0,
          borderRadius: 20,
          marginHorizontal: 30,   
          height: 60, 
        },
        tabBarActiveTintColor: 'magenta',
        
        tabBarStyle: {
          backgroundColor: 'black',
          height: 80,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }
      }}
    >
      <Tab.Screen 
        style={{background: 'red'}}
        name='Roulette'         
        component={Main} 
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon 
              name="home"
              color={'gray'}
              size={35}
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
              color={'gray'}
              size={35}
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
              color={'gray'}
              size={35}
            />
          )
        }} 
      />
    </Tab.Navigator>
  )
}

