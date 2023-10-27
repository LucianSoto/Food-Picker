/**
 * @format
 */
import React, { useEffect } from 'react'
import {
  StatusBar,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets, SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { Routes } from './src/Routes'
import EStyleSheet from 'react-native-extended-stylesheet'
import store from './src/redux/store'
import { Provider } from 'react-redux'

type BgProps = {
  backgroundColor: string,
}

function App(): JSX.Element {
  useEffect(()=> {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  },[])
  
  const CustomStatusBar = (backgroundColor: BgProps) => { 
    const bgColor = backgroundColor.backgroundColor
    // console.log(color, 'APP')
    // when I try to remove the type warning by creating a type and destructuring the object it does not work on IOS so leaving warning here
    const insets = useSafeAreaInsets();
    return (
      <View style={{ height: insets.top, backgroundColor: bgColor}}>
        <StatusBar
          animated={true}
          backgroundColor={bgColor}
        />
      </View>
    );
  }

  return (  
    <SafeAreaProvider>
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
    backgroundColor:'#c2003f',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});