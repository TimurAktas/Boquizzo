import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from './src/screens/ProfileScreen/ProfileScreen';
import { NativeBaseProvider } from "native-base";
import { MainStackNavigation } from './src/navigation/MainStackNavigation';



const BottomTab = createBottomTabNavigator();
function App() {
  return (
    <NativeBaseProvider>
      <MainStackNavigation/>
    </NativeBaseProvider>
  );
}

export default App;