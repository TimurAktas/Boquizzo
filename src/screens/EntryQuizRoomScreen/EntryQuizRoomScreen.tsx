import { Box, Input, Text } from 'native-base';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { QuizCard } from '../../components/QuizCard/QuizCard';
import { getQuizData } from '../../redux/quiz/quiz.action';
import { QuizType } from '../../redux/quiz/quiz.types';
import { AppDispatch } from '../../redux/store';

export const EntryQuizroomScreen: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState(String)
    const [quizFound, setQuizFound] = useState(false)
    const [foundQuizData, setFoundQuizData] = useState({})
    const dispatch: AppDispatch = useDispatch();
    
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
                }
            })
        }else{
           setErrorMessage("ID muss 6 zahlen haben")
           setQuizFound(false)
        }
        
    };

    return (
        <Box flex={1} alignItems={'center'} backgroundColor="primary.50">
           <Box margin={8}>
                <Text fontSize={16} color={'black'}>Gib den 6-stelligen Code ein um beizutreten</Text>
                <Text fontSize={12} color={'gray.700'} marginLeft={6}>Den Code findest du auf dem Bildschirm vor dir</Text>
                <Input marginTop={2} placeholder="Input" w="100%" onChangeText={handleChange} color={'black'}/>
                {errorMessage && <Text fontSize={12} marginTop={2} color={'red.600'}>{errorMessage}</Text> }
            </Box>

           {quizFound && <QuizCard _id={0} participants={foundQuizData.participants} active={foundQuizData.active} creatorId={foundQuizData.creatorId} quizId={foundQuizData.quizId} questions={[]}></QuizCard>}
        </Box>
    );
};