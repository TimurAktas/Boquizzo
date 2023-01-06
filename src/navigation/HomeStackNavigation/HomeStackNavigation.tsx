import React, { useEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { QuizroomScreen } from '../../screens/QuizroomScreen/QuizroomScreen';
import { HomeScreen } from '../../screens/HomeScreen/HomeScreen';
import { socket } from '../../utils/Socket';
import { EntryQuizroomScreen } from '../../screens/EntryQuizRoomScreen/EntryQuizRoomScreen';
import { HallOfFameScreen } from '../../screens/HallOfFameScreen/HallOfFameScreen';

export type HomeStackParams = {
    HomeScreen: undefined;
    HallOfFameScreen: any;
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
                    animation: 'fade',
                    headerShown: false 
                }}
                component={QuizroomScreen} />
            <HomeStack.Screen 
                name="HallOfFameScreen" 
                options={{
                    title:'Quiz Room',
                    animation: 'fade',
                    headerShown: false 
                }}
                component={HallOfFameScreen} />
             <HomeStack.Screen 
                name="EntryQuizRoomScreen" 
                options={{
                    title:'Quiz beitreten',
                    animation: 'fade',
                    headerShown: false 
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