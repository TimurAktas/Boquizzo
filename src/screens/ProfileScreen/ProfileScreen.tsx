import { Box, HStack, Stack, VStack,Text, ScrollView, FavouriteIcon, InfoIcon} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from "native-base";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { QuizType } from '../../redux/quiz/quiz.types';
import { QuizCard } from '../../components/QuizCard/QuizCard';

export const ProfileScreen: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.data);

    const [allQuizzes, setAllQuizzes] = useState<QuizType[]>()

    useEffect(() => {
        getAllQuizzesFromUser(user.matrikelnummer)
        
    },[])

    const getAllQuizzesFromUser= ( async (userId)=> {
        const response = await fetch(`http://localhost:3001/api/quizzes/${userId}/allQuizzes`);
        const json = await response.json();
        console.log("ALL QUIZZES FROM USER: ",json)

        console.log("QUIZZED LENGHT: ",json.length)
        setAllQuizzes(json)
        return json
    })

    return (
        <Box style={style.viewStyle} backgroundColor="primary.50">
            <Box h={40} w={'100%'} backgroundColor={'red.700'} borderBottomRadius={30}>
                <HStack marginTop={16} padding={4} justifyContent={'space-between'}>
                    <HStack>
                        <Avatar bg="green.500" source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}}>
                            AJ
                        </Avatar>

                        <Box marginLeft={4}>
                            <Text color={'white'} fontSize={16} bold>{user?.name} {user?.surname}</Text>
                            <Text color={'white'} fontSize={16}>{user?.uni}</Text>
                        </Box>
                    </HStack>
                    
                    <VStack>
                        <Text color={'white'} fontSize={16} bold>Quizpunkte</Text>
                        <Text color={'white'} fontSize={16} alignSelf={'center'}>{user?.quizPoints}</Text>
                    </VStack>
                </HStack>
            </Box>

            <Text color={'black'} bold fontSize={14} margin={4}>Abgeschlossene Quiz's</Text>
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