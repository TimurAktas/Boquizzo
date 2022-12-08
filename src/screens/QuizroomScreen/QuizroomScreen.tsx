import { Badge, Box, Flex, HStack, Pressable, ScrollView, Spacer, Text, VStack } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizData } from '../../redux/quiz/quiz.action';
import { AppDispatch, RootState } from '../../redux/store';
import { socket } from '../../utils/Socket';
import {AppState} from 'react-native'
import { OptionType } from '../../redux/quiz/quiz.types';

export const QuizroomScreen: React.FC = ({ route }:any) => {
    const quizId: string =  route.params.quizId
    const dispatch: AppDispatch = useDispatch();
    const quizData = useSelector((state: RootState) => state.quiz.data);
    const user = useSelector((state: RootState) => state.user.data);
    const [questionIndex, setQuestionIndex] = useState(0)
    const [optionVergleich, setOptionVergleich ] = useState(Number)
    const appState = useRef(AppState.currentState);


    useEffect(() => {
        if(quizId) {
            getQuizDataAndRefreshState()
            // emitter
            socket.emit("joinRoom", {quizId: quizId, userId: user?.matrikelnummer})

            // listener
            socket.on('changedPage', (data)=> {
                setOptionVergleich(null)
                console.log("changed Page")
                setQuestionIndex(data.newIndex)
                console.log(data.newQuiz.questions[data.newIndex].userAnswers)
            })

            socket.on("givedAnswer", data => {
                console.log("dahsdhasdhadhsh")
            })

            socket.on('sendtoEveryOne', (data) => {
                console.log(`Send to everyoneeee!!!`)
            });

            socket.on('leavedRoom', (data) => {
                console.log("user has leaved the Room: ", data.userId)
            })

            socket.on('joinedRoom', (data) => {
                console.log("Joined Room", data.userId)
            })

        }
        else console.log("Keine Gültige ID")

        return () => {
          // Wenn Seite geschlossen wird - alle listener aus
          socket.off('changedPage');
          socket.off('joinedRoom')
          socket.emit("leaveRoom",{quizId: quizId, userId: user?.matrikelnummer})
        };
        
    },[])

    useEffect(() => {
        //Check ob App im vordergrund ist oder nicht
        const subscription = AppState.addEventListener("change", nextAppState => {
          if ( appState.current.match(/inactive|background/) && nextAppState === "active") {
            socket.emit("joinRoom", {quizId: quizId, userId: user?.matrikelnummer}) //User ist wieder in der App
            getQuizDataAndRefreshState()
          }else{
            socket.emit("leaveRoom",{quizId: quizId, userId: user?.matrikelnummer}) //User verlässt App
          }

          appState.current = nextAppState;

        });
    
        return () => {
          subscription.remove();
        };
    }, []);

    const getQuizDataAndRefreshState = (() => {
        dispatch(getQuizData(quizId)).then((data) => {
            console.log(data.payload)
            setQuestionIndex(data.payload.currentPageIndex)
        })

    })

    const sendAnswerToServer = ((option: OptionType) => {
        setOptionVergleich(option.index)
        socket.emit('giveAnswer', {quizId: quizId, userId: user?.matrikelnummer, questionIndex , option})
    })

    const getLetter = (num: number) => {
        let buchstabe = ''
        switch(num) {
            case 1:
                buchstabe = 'A'
                return buchstabe
            case 2:
                buchstabe = 'B'
                return buchstabe
            case 3:
                buchstabe = 'C'
                return buchstabe
            case 4:
                buchstabe = 'D'
                return buchstabe
            case 5:
                buchstabe = 'E'
                return buchstabe
            case 6:
                buchstabe = 'F'
                return buchstabe
            default:
            // code block

            return buchstabe
        }
    }

    return (
        <Box style={style.viewStyle} backgroundColor="primary.50">
            <VStack w={'100%'} marginTop={4} alignItems={'center'} justifyContent={'center'} >
                <HStack height={10} width={'100%'} padding={2} justifyContent={'space-between'}>
                    {quizData && <Text color={'black'} fontSize={16}>Frage {questionIndex+1}/{quizData.questions.length}</Text>}
                    <Text color={'black'} bold fontSize={16}>Leaderboard anzeigen</Text>
                </HStack>
                
                {quizData && <Text color={'black'} alignSelf={'flex-end'} fontSize={16} marginRight={2}>{quizData.participants.length} Teilnehmer</Text>}

                {quizData && <Text color={'black'} fontSize={20} bold marginBottom={2} margin={6}>{quizData?.questions[questionIndex]?.question} </Text>}

                <ScrollView>
                    {quizData?.questions[questionIndex]?.options.map((option,i)=> {                 
                        return (
                            <Pressable onPress={() => sendAnswerToServer(option)} key={ Math.random()}>{({ isHovered, isFocused, isPressed }) => {
                                return <HStack bg={optionVergleich == option.index ? 'blue.500':'white.200'}  style={{transform: [{scale: isPressed ? 0.96 : 1}], borderWidth:1,borderColor:'gray'}} rounded='20' borderColor="coolGray.300" marginTop={5} w={300} padding={4}> 
                                            <Text color={optionVergleich == option.index ? 'white':"coolGray.500"} fontWeight="medium" fontSize="xl">
                                                {getLetter(option.index)}: 
                                            </Text>
                                            <Text style={{marginLeft:'auto',marginRight:'auto'}} color={optionVergleich == option.index ? 'white':"coolGray.500"} fontWeight="medium" fontSize="xl">
                                                {option.value}
                                            </Text>
                                        </HStack>

                                }}
                            </Pressable>
                        )
                    })}
                </ScrollView>
            </VStack>

        </Box>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems:'center' },
});