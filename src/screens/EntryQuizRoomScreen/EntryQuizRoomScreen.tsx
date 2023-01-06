import { useNavigation } from '@react-navigation/native';
import { ArrowBackIcon, Box, ChevronLeftIcon, HStack, Input, Pressable, Text } from 'native-base';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { QuizCard } from '../../components/QuizCard/QuizCard';
import { getQuizData } from '../../redux/quiz/quiz.action';
import { QuizType } from '../../redux/quiz/quiz.types';
import { AppDispatch } from '../../redux/store';

export const EntryQuizroomScreen: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState(String)
    const [quizFound, setQuizFound] = useState(false)
    const [foundQuizData, setFoundQuizData] = useState<QuizType>()
    const dispatch: AppDispatch = useDispatch();
    const navigation = useNavigation();
    
    const handleChange = (quizId:string) => {
        if(quizId.length == 6){
            dispatch(getQuizData(quizId)).then((data) => {
                if(data.payload){
                    console.log("found quiz: ", data.payload)
                    setQuizFound(true)
                    setErrorMessage('')
                    setFoundQuizData(data.payload)
                }else{
                    setErrorMessage("Kein Quiz mit dieser ID gefunden!")
                    setFoundQuizData(null)
                }
            })
        }else{
           setErrorMessage("ID muss 6 zahlen haben")
           setFoundQuizData(null)
           setQuizFound(false)
        }
        
    };

    return (
        <Box flex={1} alignItems={'center'} backgroundColor={'gray.200'}>
            <Box height={56} w={'100%'} backgroundColor={'red.700'} borderBottomRadius={30}>
                
                <Pressable marginLeft={4} marginTop={16} height={10} onPress={() => navigation.goBack()}> 
                    <HStack>
                        <Box backgroundColor={'rgba(255,255,255, 0.6)'} borderRadius={20} w={8} h={8} marginTop={2} alignItems={'center'} justifyContent={'center'}>
                            <ChevronLeftIcon  size="5" color="red.700" />
                        </Box>
                        <Text fontSize={30} marginLeft={4} bold>Quiz suchen</Text>
                    </HStack>
                </Pressable>
        
                <Box marginLeft={4} marginRight={4} marginTop={8} backgroundColor={'white'} padding={4} borderRadius={20}>
                    <Text fontSize={16} color={'black'}>Gib den 6-stelligen Code ein um beizutreten</Text>
                    <Text fontSize={12} color={'gray.700'} marginLeft={6}>Den Code findest du auf dem Bildschirm vor dir</Text>
                    <Input marginTop={4} placeholder="Input" w="100%" onChangeText={handleChange} color={'black'}/>
                    {errorMessage && <Text fontSize={12} marginTop={2} color={'red.600'}>{errorMessage}</Text> }
                </Box>
            </Box>

            <Box marginTop={20} height={'100%'} width={'100%'}>
                {foundQuizData && <Box>
                    <Text  marginLeft={'auto'} marginRight={'auto'}  fontSize={20} color={'black'} bold>Quiz Gefunden!</Text>
                    <QuizCard title={foundQuizData.title} quizId={foundQuizData.quizId} creatorId={foundQuizData.creatorId} questions={foundQuizData.questions} currentPageIndex={foundQuizData.currentPageIndex} participants={foundQuizData.participants} ></QuizCard>
                </Box> 
                }
            </Box>
        </Box>
    );
};