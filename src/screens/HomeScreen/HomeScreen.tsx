import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Pressable, Text, Image, HStack, ScrollView, Avatar, FavouriteIcon, SunIcon, InfoIcon } from 'native-base';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveQuizCard } from '../../components/ActiveQuizCard/ActiveQuizCard';
import { HomeStackParams } from '../../navigation/HomeStackNavigation/HomeStackNavigation';
import { AppDispatch, RootState } from '../../redux/store';
import { getUserWithAccessToken } from '../../redux/user/user.action';
import {StatusBar} from 'react-native';

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    const hsboLogo = require('../../assets/img/hsbologo.png');
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.data);
    const quizData = useSelector((state: RootState) => state.quiz.data);

    useEffect(() => {
        dispatch(getUserWithAccessToken())
    },[])

    return (
        <Box style={{ flex: 1}} backgroundColor={'gray.200'} >
            <Box h={40} w={'100%'} backgroundColor={'red.700'} borderBottomRadius={30}>
                <HStack marginTop={10} padding={4} justifyContent={'space-between'}>
                    <HStack>
                        <Avatar bg="green.500" source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}}>
                            AJ
                        </Avatar>

                        <Box marginLeft={4}>
                            <Text fontSize={16}>Guten Tag  <FavouriteIcon color="white"/></Text> 
                            <Text color={'white'} fontSize={16} bold>{user?.name} {user?.surname}</Text>
                        </Box>
                    </HStack>
                    
                    <HStack>
                        <InfoIcon size="5" mt="0.5" color="white" />
                    </HStack>
                </HStack>

                <Box marginLeft={'auto'} marginRight={'auto'}>
                    <Text fontSize={18}> Lass uns dein Wissen testen </Text>
                </Box>
            </Box>

            <ScrollView w={'100%'}>
                <Box w={'100%'} marginTop={4} alignItems={'center'} justifyContent={'center'}>
                    <Box w={'90%'} backgroundColor="white" borderRadius={10}>
                        <Box marginLeft={'auto'} marginRight={'auto'} >
                            <Image source={hsboLogo} alt={'hsboLogo'} height={16} width={56} marginTop={4} />
                        </Box>

                        <Box /*TrennWand*/ h={.4} w={'90%'} backgroundColor={'gray.300'} marginLeft={'auto'} marginRight={'auto'} marginTop={4}></Box>

                        <Box w={'90%'} marginLeft={'auto'} marginRight={'auto'}>
                            <HStack justifyContent={'space-between'} marginTop={4}>
                                <Text color={'gray.700'} fontSize={16}>Name</Text>
                                <Text color={'gray.700'} fontSize={16} bold>{user?.name} {user?.surname}</Text>
                            </HStack> 

                            <HStack justifyContent={'space-between'} marginTop={4}>
                                <Text color={'gray.700'} fontSize={16}>Matrikelnummer</Text>
                                <Text color={'gray.700'} fontSize={16} bold>{user?.matrikelnummer}</Text>
                            </HStack> 

                            <HStack justifyContent={'space-between'} marginTop={4}>
                                <Text color={'gray.700'} fontSize={16}>Semester</Text>
                                <Text color={'gray.700'} fontSize={16} bold>{user?.semester}</Text>
                            </HStack> 
                        
                            <HStack justifyContent={'space-between'} marginTop={4}>
                                <Text color={'gray.700'} fontSize={16}>Uni/Hochschule</Text>
                                <Text color={'gray.700'} fontSize={16} bold>{user?.uni}</Text>
                            </HStack> 
                        </Box>

                        <Box /*TrennWand*/ h={.4} w={'90%'} backgroundColor={'gray.300'} marginLeft={'auto'} marginRight={'auto'} marginTop={4} marginBottom={4}></Box>

                        <Pressable w={'90%'} marginBottom={4} marginLeft={'auto'} marginRight={'auto'} onPress={() => navigation.navigate('EntryQuizRoomScreen')}> 
                        {({ isHovered, isPressed}) => { 
                            return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="4" rounded="20" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                            <Text color="white" fontWeight="medium">
                                Quiz beitreten
                            </Text>
                            </Box>
                        }}
                        </Pressable>
                    </Box>

                

                    {quizData && 
                        <Box w={'90%'} marginTop={6} marginBottom={10}>
                            <Text color={'black'} fontSize={18} bold>Letztes Quiz</Text>
                            <ActiveQuizCard></ActiveQuizCard>
                        </Box>
                    }
                </Box>
            </ScrollView>
        </Box>
    );
};
