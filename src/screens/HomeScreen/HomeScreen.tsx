import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Badge, Box, HStack, Pressable, Text, Image } from 'native-base';
import React, {} from 'react';
import { HomeStackParams } from '../../navigation/HomeStackNavigation/HomeStackNavigation';

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    const hsboLogo = require('../../assets/img/hsbologo.png');
    return (
        <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} backgroundColor="primary.50">
            <Image source={hsboLogo} alt={'hsboLogo'} height="40" width="80" marginTop={2} />
   
            <Pressable maxW="96" w={'70%'} onPressOut={() => navigation.navigate('QuizroomScreen')}> 
                {({ isHovered, isPressed}) => { 
                    return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                    <Text color="white" fontWeight="medium">
                        Quiz beitreten
                    </Text>
                    </Box>
                }}
            </Pressable>

             <Pressable maxW="96" w={'70%'} marginTop={10} onPressOut={() => navigation.push('QuizCreatorScreen')}> 
                {({ isHovered, isPressed}) => { 
                    return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                    <Text color="white" fontWeight="medium">
                        Quiz erstellen
                    </Text>
                    </Box>
                }}
            </Pressable>

            <Pressable maxW="96" w={'90%'} marginTop={16}> 
                {({ isHovered, isFocused, isPressed}) => { 
                    return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                    <HStack alignItems="center">
                        <Badge colorScheme="green" _text={{ color: "white" }} variant="solid" rounded="4">
                        Aktiv seit 25:30 min
                        </Badge>
                    </HStack>
                    <Text color="black" mt="3" fontWeight="medium" fontSize="xl">
                        Quiz titel
                    </Text>
                        <HStack>
                            <Text color="black">Teilnehmer</Text>
                            <Text color="black">25</Text>
                        </HStack>
                        <HStack>
                            <Text color="black">Frage</Text>
                            <Text color="black">10/30</Text>
                        </HStack>
                    </Box>
                }}
            </Pressable>
  
        </Box>
      );
};
