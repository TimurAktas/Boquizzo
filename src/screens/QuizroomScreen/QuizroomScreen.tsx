import { Box, CheckIcon, HStack, Pressable,Text, VStack } from 'native-base';
import React, {} from 'react';
import { StyleSheet, View } from 'react-native';


export const QuizroomScreen: React.FC = () => {
    return (
        <View style={style.viewStyle}>
           <Box w={'80%'} h={240} borderColor={'black'} borderWidth={1}></Box>
            

            <VStack w={'100%'} marginTop={10} alignItems={'center'} justifyContent={'center'} >
                <Text fontSize={20}>Quiz Gefunden!</Text>

                <VStack w={'80%'} backgroundColor={'white'} alignItems={'center'} padding={4} borderRadius={10}>
                    <Text>Titel des Quiz</Text>
                    <Text>Teilnehmerzahl: 25,</Text>
                    <Text>Ersteller: Timur Aktas</Text>
               
                    <Pressable w={'100%'} onPressOut={() => console.log('blabla')}> 
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
        </View>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems: 'center', justifyContent:'center',backgroundColor: 'lightgray' },
});