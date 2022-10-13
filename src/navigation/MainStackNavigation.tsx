import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { HomeScreenStack, HomeStackParams } from './HomeStackNavigation/HomeStackNavigation';

export type BottomTabParams = {
    Home: HomeStackParams;
    Profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParams>();

export const MainStackNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <BottomTab.Navigator> 
                <BottomTab.Screen
                    name="Home"
                    component={HomeScreenStack}
                    options={{
                        headerShown: false,
                    }} 
                />
                <BottomTab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                    }} 
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
};
