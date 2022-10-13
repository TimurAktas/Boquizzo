import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';

export type BottomTabParams = {
    Home: undefined;
    Profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParams>();

export const MainStackNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <BottomTab.Navigator> 
                <BottomTab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{

                    }}
                />
                <BottomTab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{

                    }}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
};
