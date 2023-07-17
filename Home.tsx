import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from "./pages/settings/Settings"
import Favorites from "./pages/favorites/Favorites"
import Main from "./pages/Main"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

export const Home = () => {
  const Tab = createBottomTabNavigator()

  return(
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
  )
}

