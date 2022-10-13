
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Badge, Box,Flex,HStack,Pressable,Spacer,Text } from 'native-base';
import React, {} from 'react';
import { StyleSheet, View} from 'react-native';
import { HomeStackParams } from '../../navigation/HomeStackNavigation/HomeStackNavigation';


export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable maxW="96" w={'70%'} onPressOut={() => navigation.navigate('QuizroomScreen')}> 
                {({ isHovered, isPressed}) => { 
                    return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                    <Text color="white" fontWeight="medium">
                        Quiz beitreten
                    </Text>
                    </Box>
                }}
            </Pressable>

             <Pressable maxW="96" w={'70%'} marginTop={10} onPressOut={() => navigation.navigate('QuizCreatorScreen')}> 
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
                    <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                        Quiz titel
                    </Text>
                        <HStack>
                            <Text>Teilnehmer</Text>
                            <Text>25</Text>
                        </HStack>
                        <HStack>
                            <Text>Frage</Text>
                            <Text>10/30</Text>
                        </HStack>
                        <HStack>
                            <Text>Dauer</Text>
                            <Text>seit 25:20 min aktiv</Text>
                        </HStack>
                    </Box>
                }}
            </Pressable>
  
        </View>
      );
};
