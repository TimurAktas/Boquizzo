import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from './src/screens/ProfileScreen/ProfileScreen';
import { extendTheme, NativeBaseProvider } from "native-base";
import { MainStackNavigation } from './src/navigation/MainStackNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const BottomTab = createBottomTabNavigator();
function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <MainStackNavigation/>
      </Provider>
    </NativeBaseProvider>
  );
}

export default App;


//Theme
const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: 'white', // BackgroundColor
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
    // Redefining only one shade, rest of the color will remain same.
    amber: {
      400: '#d97706',
    },
    bgColor: 'white'
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
