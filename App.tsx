/**
 * @format
 */
import React, { useEffect } from 'react'
import {
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';
// Do I need to import platform for react-native?? seems to be working fine w/o it.
import { useSafeAreaInsets, SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { Routes } from './src/Routes'
import EStyleSheet from 'react-native-extended-stylesheet'
import store from './src/redux/store'
import { Provider } from 'react-redux'


function App(): JSX.Element {
  const theme = {
    // ...DefaultTheme,
    // colors: {
    //   ...DefaultTheme.colors,
    //   background: '#fff',
    // },
  }
  // const isDarkMode = useColorScheme() === 'dark';

  useEffect(()=> {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  },[])
  
  const CustomStatusBar = (backgroundColor: any) => { 
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
    // <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer 
          // theme={theme}      
        >
          <CustomStatusBar backgroundColor={EStyleSheet.value('$mainColor_magenta')} />
          <Routes 
            // navigation={undefined} state={undefined} descriptions={undefined} 
          />
        </NavigationContainer>
      </Provider>
  //  </SafeAreaProvider>
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