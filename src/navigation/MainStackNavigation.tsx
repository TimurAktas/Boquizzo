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
import Svg, { Path, SvgUri } from 'react-native-svg';

const homeIcon = require('../assets/icons/home-2-svgrepo-com.svg');

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
                            tabBarActiveTintColor:'#aa2e31',
                            headerShown: false,
                            tabBarIcon: ({ focused }) => {
                                return (
                                    focused ? 
                                    <SvgUri
                                        width="100%"
                                        height="80%"
                                        fill="#aa2e31"
                                        fillOpacity={0.3}
                                        uri='/Users/timur.aktas-gonzalez/Bachelorarbeit/Boquizzo/src/assets/icons/home-2-svgrepo-com.svg'
                                    />
                                   :
                                    <SvgUri
                                        width="100%"
                                        height="80%"
                                        uri='/Users/timur.aktas-gonzalez/Bachelorarbeit/Boquizzo/src/assets/icons/home-2-svgrepo-com.svg'
                                    />
                                );
                            }
                        }} 
                    />
                    <BottomTab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            tabBarActiveTintColor:'#aa2e31',
                            headerShown: false,
                            tabBarIcon: ({ focused }) => {
                                return (
                                    focused ? 
                                    <SvgUri
                                        width="100%"
                                        height="80%"
                                        fill="#aa2e31"
                                        fillOpacity={0.3}
                                        uri='/Users/timur.aktas-gonzalez/Bachelorarbeit/Boquizzo/src/assets/icons/profile-circle-svgrepo-com.svg'
                                    />
                                   :
                                    <SvgUri
                                        width="100%"
                                        height="80%"
                                        uri='/Users/timur.aktas-gonzalez/Bachelorarbeit/Boquizzo/src/assets/icons/profile-circle-svgrepo-com.svg'
                                    />
                                );
                            }
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
