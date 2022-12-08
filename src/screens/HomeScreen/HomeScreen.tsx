import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Pressable, Text, Image } from 'native-base';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveQuizCard } from '../../components/ActiveQuizCard/ActiveQuizCard';
import { HomeStackParams } from '../../navigation/HomeStackNavigation/HomeStackNavigation';
import { AppDispatch, RootState } from '../../redux/store';
import { getUserWithAccessToken } from '../../redux/user/user.action';

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
        <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} backgroundColor="primary.50">
            <Image source={hsboLogo} alt={'hsboLogo'} height="40" width="80" marginTop={2} />
   
            <Box w={'90%'}>
                <Text color={'black'} fontSize={16}>HALLO {user?.name?.toLocaleUpperCase()} {user?.surname?.toLocaleUpperCase()}</Text>
                <Text color={'black'} fontSize={16}>Matrikelnummer: {user?.matrikelnummer}</Text>
                <Text color={'black'} fontSize={16}>Semester: {user?.semester}</Text>
                <Text color={'black'} fontSize={16}>Uni/Hochschule: {user?.uni}</Text>
            </Box>

            <Pressable maxW="96" marginTop={10} w={'70%'} onPressOut={() => navigation.navigate('EntryQuizRoomScreen')}> 
                {({ isHovered, isPressed}) => { 
                    return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                    <Text color="white" fontWeight="medium">
                        Quiz beitreten
                    </Text>
                    </Box>
                }}
            </Pressable>

            {quizData && 
                <Box w={'90%'} marginTop={10}>
                    <Text color={'black'} fontSize={20} bold>Aktiver Quiz</Text>
                    <ActiveQuizCard></ActiveQuizCard>
                </Box>
            }
  
        </Box>
      );
};
