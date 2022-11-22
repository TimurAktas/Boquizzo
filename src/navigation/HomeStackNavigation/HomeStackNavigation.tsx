import React, { useEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { QuizroomScreen } from '../../screens/QuizroomScreen/QuizroomScreen';
import { HomeScreen } from '../../screens/HomeScreen/HomeScreen';
import { socket } from '../../utils/Socket';
import { EntryQuizroomScreen } from '../../screens/EntryQuizRoomScreen/EntryQuizRoomScreen';

export type HomeStackParams = {
    HomeScreen: undefined;
    QuizroomScreen: any; //TODO: Hab alles versucht und nichts hat geklappt -> {quizId:string}
    EntryQuizRoomScreen: undefined;
};
const HomeStack = createNativeStackNavigator<HomeStackParams>();

export const HomeScreenStack: React.FC = () => {

    useEffect(() => {
        socket
        
    },[])
    
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
                    title:'Quiz Room',
                    animation: 'fade'
                }}
                component={QuizroomScreen} />
             <HomeStack.Screen 
                name="EntryQuizRoomScreen" 
                options={{
                    title:'Quiz beitreten',
                    animation: 'fade'
                }} 
                component={EntryQuizroomScreen} />
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