import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Pressable, Text, VStack } from 'native-base';
import React, {} from 'react';
import { StyleSheet, View } from 'react-native';
import { HomeStackParams } from '../../navigation/HomeStackNavigation/HomeStackNavigation';


export const EntryQuizroomScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

    return (
        <Box style={style.viewStyle} backgroundColor="primary.50">
           <Box w={'80%'} h={240} borderColor={'black'} borderWidth={1} marginTop={10}></Box>
            

            <VStack w={'100%'} marginTop={10} alignItems={'center'} justifyContent={'center'} >
                <Text fontSize={20} color={'black'}>Quiz Gefunden!</Text>

                <VStack w={'80%'} backgroundColor={'white'} alignItems={'center'} shadow={6} padding={4} borderRadius={10}>
                    <Text color={'black'}>Titel des Quiz</Text>
                    <Text color={'black'}>Teilnehmerzahl: 25,</Text>
                    <Text color={'black'}>Ersteller: Timur Aktas</Text>
               
                    <Pressable w={'100%'} onPressOut={() => navigation.navigate('QuizroomScreen',{quizId: '398072'})}> 
                        {({ isHovered, isPressed}) => { 
                            return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                            <Text color="white" fontWeight="medium">
                                Quiz beitreten
                            </Text>
                            </Box>
                        }}
                    </Pressable>
                </VStack>
            </VStack>
        </Box>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems:'center' },
});