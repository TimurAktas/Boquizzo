import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen/ProfileScreen';
import { HomeScreenStack, HomeStackParams } from './HomeStackNavigation/HomeStackNavigation';
import { AddIcon } from 'native-base';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { createStackNavigator } from '@react-navigation/stack';
import { RegistrationScreen } from '../screens/RegistrationScreen/RegistrationScreen';

export type BottomTabParams = {
    Home: HomeStackParams;
    Profile: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParams>();


export type LoginRegiTabParams = {
    Login: undefined;
    Registration: undefined;
};

const LoginRegiStack = createStackNavigator<LoginRegiTabParams>();

export const MainStackNavigation: React.FC = () => {
    const accessToken = useSelector((state: RootState) => state.auth.data?.idToken);
    return (
        <NavigationContainer>
            {accessToken ? (
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
                ) : (
                    <LoginRegiStack.Navigator>
                    <LoginRegiStack.Screen name="Login" component={LoginScreen}   options={{ headerShown: false }}   />
                    <LoginRegiStack.Screen name="Registration" component={RegistrationScreen}   options={{ headerShown: false }}   />
                  </LoginRegiStack.Navigator>
                )}
        </NavigationContainer>
    );
};
