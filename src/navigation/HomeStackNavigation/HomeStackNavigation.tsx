import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { QuizroomScreen } from '../../screens/QuizroomScreen/QuizroomScreen';
import { HomeScreen } from '../../screens/HomeScreen/HomeScreen';
import { QuizCreatorScreen } from '../../screens/QuizCreatorScreen/QuizCreatorScreen';

export type HomeStackParams = {
    HomeScreen: undefined;
    QuizroomScreen: undefined;
    QuizCreatorScreen: undefined;
};
const HomeStack = createNativeStackNavigator<HomeStackParams>();

export const HomeScreenStack: React.FC = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen 
                name="HomeScreen" 
                options={{ headerShown: false }}  
                component={HomeScreen} 
            />
            <HomeStack.Screen 
                name="QuizroomScreen" 
                options={{
                    headerShown: false,
                    animation: 'fade'
                }} 
                component={QuizroomScreen} />
            <HomeStack.Screen 
                name="QuizCreatorScreen" 
                options={{
                    headerShown: false,
                    animation: 'fade'
                }} 
                component={QuizCreatorScreen}/>
        </HomeStack.Navigator>
    );
};


const headerOptions: NativeStackNavigationOptions  = {
    title: 'Start',
    headerStyle: {
      backgroundColor: '#rgba(204, 226, 244, 0.5)',
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: '400',
      fontSize: 15,
      color:'#000000',

    },
    headerShadowVisible:false,
}