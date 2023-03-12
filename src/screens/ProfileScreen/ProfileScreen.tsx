import { Box, Pressable, Text, Image, HStack, ScrollView, Avatar, VStack} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { QuizType } from '../../redux/quiz/quiz.types';
import { QuizCard } from '../../components/QuizCard/QuizCard';
import { logoutUser } from '../../redux/auth/auth.action';
import { API_URL } from '../../config/config';
const catAvatar = require('../../assets/img/illustration/catAvatar.jpg');
export const ProfileScreen: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.data);
    const dispatch: AppDispatch = useDispatch();
    const professor = require('../../assets/professor.png');
    const [allQuizzes, setAllQuizzes] = useState<QuizType[]>()

    useEffect(() => {
        getAllQuizzesFromUser(user.id)
        return () => {
            // Wenn Seite geschlossen wird - alle listener aus
           console.log("bin raus")
          };
          
    },[])

    const getAllQuizzesFromUser= ( async (userId)=> {
        const response = await fetch(`${API_URL}/api/quizzes/${userId}/allQuizzes`);
        const json = await response.json();
        console.log("ALL QUIZZES FROM USER: ",json)

        console.log("QUIZZED LENGHT: ",json.length)
        setAllQuizzes(json)
        return json
    })

    const logout = () => {
        console.log("Bin hier")
        dispatch(logoutUser())
    }

    return (
        <Box style={style.viewStyle} backgroundColor="primary.50">
            <Box h={40} w={'100%'} backgroundColor={'red.700'} borderBottomRadius={30}>
                <HStack marginTop={10} padding={4} justifyContent={'space-between'}>
                    <HStack>
                        <Avatar bg="green.500" source={catAvatar}>
                            AJ
                        </Avatar>

                        <Box marginLeft={4}>
                            <Text color={'white'} fontSize={16} bold>{user?.name} {user?.surname}</Text>
                            <Text color={'white'} fontSize={16}>{user?.uni}</Text>
                        </Box>
                    </HStack>
                    
                    <VStack>
                        <Text color={'white'} fontSize={16} bold>Quizpunkte</Text>
                        <Text color={'white'} fontSize={16} alignSelf={'center'}>{user?.quizPoints}000</Text>
                    </VStack>
                </HStack>

                <HStack justifyContent={'space-between'} width={200} alignSelf={'center'} marginLeft={-10}> 
                        <Text fontSize={16}>Rang: </Text>
                        <HStack>
                            <Text fontSize={16} bold>BO-Quizzo Challenger </Text>
                            <Image source={professor} alt={'rdImg'} height={6} width={6} backgroundColor={'gray.100'} />
                        </HStack>
                    </HStack> 
            </Box>

            <Pressable alignSelf={'center'} w={'90%'} marginTop={10} onPress={logout}> 
                    {({ isHovered, isFocused, isPressed}) => { 
                        return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                        <Text bold fontSize={16} color="white" fontWeight="medium">
                            Abmelden
                        </Text>
                        </Box>
                        }}
                    </Pressable>

            <Text color={'black'} bold fontSize={16} margin={4}>Abgeschlossene Quiz's</Text>
            <ScrollView showsVerticalScrollIndicator={false}> 
                {allQuizzes?.map((quiz) => {
                    return <QuizCard title={quiz.title} quizId={quiz.quizId} creatorId={quiz.creatorId} questions={quiz.questions} currentPageIndex={quiz.currentPageIndex} participants={quiz.participants} ></QuizCard>
                })}
            </ScrollView>
        </Box>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1},
});