import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { HomeScreenStack, HomeStackParams } from './HomeStackNavigation/HomeStackNavigation';
import { AddIcon } from 'native-base';

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
                        tabBarIcon: ({ color }) => (
                            <AddIcon size="5" mt="0.5" color="black" />
                        ),
                    }} 
                />
                <BottomTab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <AddIcon size="5" mt="0.5" color="black" />
                          ),
                    }} 
                    
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
};
