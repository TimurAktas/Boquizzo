import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Input, Pressable,Text,Image, HStack, ChevronLeftIcon, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStackParams } from '../../navigation/HomeStackNavigation/HomeStackNavigation';
import { getQuizData } from '../../redux/quiz/quiz.action';
import { AppDispatch, RootState } from '../../redux/store';

export const HallOfFameScreen: React.FC = ({ route }:any) => {
    const quizId: string =  route.params.quizId
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    const dispatch: AppDispatch = useDispatch();


    const quizData = useSelector((state: RootState) => state.quiz.data);
    

    const first = require('../../assets/img/firstplace.png');
    const second = require('../../assets/img/secondplace.png');
    const third = require('../../assets/img/thirdplace.png');

    
    useEffect(() => {
        if(quizId) console.log("QUIZ ID: ", quizId)

        dispatch(getQuizData(quizId)).then((data) => {
            console.log(data.payload.leaderboard)
        })

    },[])

    return (
        <View style={style.viewStyle}>
            <Box height={40} w={'100%'} backgroundColor={'red.700'} borderBottomRadius={30}>
               <Pressable marginLeft={4} marginTop={16} height={10} onPress={() => navigation.popToTop() }> 
                    <HStack>
                        <Box backgroundColor={'rgba(255,255,255, 0.6)'} borderRadius={20} w={8} h={8} marginTop={2} alignItems={'center'} justifyContent={'center'}>
                            <ChevronLeftIcon  size="5" color="red.700" />
                        </Box>
                        <Text fontSize={30} marginLeft={4} bold>Hall of Fame</Text>
                    </HStack>
                </Pressable>

                <HStack margin={6} marginTop={6} justifyContent={'center'}>
                        <Text color={'white'} bold fontSize={18}>{quizData?.title}</Text>
                </HStack>
            </Box>
            
            <Box marginTop={10}>
                <Text color={'black'} bold fontSize={20}>Danke fürs mitmachen!</Text>
            </Box>
            
            <ScrollView w={'90%'} marginTop={4}>
                {quizData.leaderboard.map((user, index) => {
                    // IF Else anpassen sodass platz 1,2 und 3 Mit Image sind und rest nicht
                    if(index <= 2){
                         if(index == 0){
                            return <HStack alignItems={'center'} justifyContent={'space-between'}>
                                <Image source={first} alt={'stImg'} height={16} width={16} marginTop={4} />
                                <Text color={'black'} fontSize={18} bold>{user.userId}</Text>
                                <Text color={'black'} fontSize={18} bold>2400 Punkte</Text>
                            </HStack>
                        }else if(index == 1){
                            return <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Image source={second} alt={'ndImg'} height={16} width={16} marginTop={4} />
                                <Text color={'black'} fontSize={18} bold>{user.userId}</Text>
                                <Text color={'black'} fontSize={18} bold>1900 Punkte</Text>
                            </HStack>
                        }else{
                            return <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Image source={third} alt={'rdImg'} height={16} width={16} marginTop={4} />
                                <Text color={'black'} fontSize={18} bold>{user.userId}</Text>
                                <Text color={'black'} fontSize={18} bold>1200 Punkte</Text>
                            </HStack>
                        }
                    }else{
                        return <HStack justifyContent={'space-between'} alignItems={'center'} marginTop={4}>
                            <Text color={'black'} marginLeft={6}>{index+1}. </Text>
                            <Text color={'black'} fontSize={18}>{user.userId}</Text>
                            <Text color={'black'} fontSize={18}>1200 Punkte</Text>
                        </HStack>
                    }
                })}
            </ScrollView>
        </View>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems: 'center',backgroundColor: 'white' },
});