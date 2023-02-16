import { Avatar, Badge, Box, CheckIcon, ChevronLeftIcon, CircleIcon, Flex, HStack, Icon, Modal, MoonIcon, Pressable, ScrollView, Spacer, Text, VStack, WarningOutlineIcon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizData } from '../../redux/quiz/quiz.action';
import { AppDispatch, RootState } from '../../redux/store';
import { socket } from '../../utils/Socket';
import {AppState} from 'react-native'
import { LeaderBoardType, OptionType } from '../../redux/quiz/quiz.types';
import Lottie from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../navigation/HomeStackNavigation/HomeStackNavigation';
import { UserAvatar } from '../../components/UserAvatar/UserAvatar';

export const QuizroomScreen: React.FC = ({ route }:any) => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

    const quizId: string =  route.params.quizId
    const dispatch: AppDispatch = useDispatch();
    
    const quizData = useSelector((state: RootState) => state.quiz.data);
    const user = useSelector((state: RootState) => state.user.data);
    const [questionIndex, setQuestionIndex] = useState(0)
    const [optionVergleich, setOptionVergleich ] = useState(Number)
    const appState = useRef(AppState.currentState);
    const [secondsToAnswer, setSecondsToAnswer] = useState(0)
    const [quizStarted, setQuizStarted] = useState(false)
    const [participants, setParticipants] = useState([])

    const [resolveAnswers, setResolveAnswers] = useState(false)

    const [leaderBoard, setLeaderBoard] = useState<LeaderBoardType[]>([])

    const [questionResolveMessage, setQuestionResolveMessage] = useState(false)
    const [questionResolveMessageWrong, setQuestionResolveMessageWrong] = useState(false)

    const [modalOpen, setModalOpen] = useState(false)

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
  

    useEffect(() => {
        // Ist das Quiz schon rum? Dann navigiere weiter auf die Hall of Fame ansonsten starte das Quiz
        if(quizData?.isOver){
            navigation.replace('HallOfFameScreen',{quizId: quizData?.quizId})
        }else{

        if(quizId) {
            getQuizDataAndRefreshState()
            setSecondsToAnswer(quizData?.questions[questionIndex]?.secondsToAnswer)
            // emitter
            
            socket.emit("joinRoom", {quizId: quizId, userId: user?.id})

            // listener
            socket.on('changedPage', (data)=> {
                setResolveAnswers(false)
                setOptionVergleich(null)
                console.log("changed Page")
                setQuestionIndex(data.newIndex)
                console.log(data.newQuiz.questions[data.newIndex].userAnswers)
            })
            
            socket.on('leavedRoom', (data) => {
                console.log("user has leaved the Room: ", data.userId)
            })

            socket.on('startedQuiz', (data) => {
                setQuizStarted(true)
            })

            socket.on('timerSeconds', (data) => {
                console.log("Zeit zum antworten", data.secondsToAnswer)
                setSecondsToAnswer(data.secondsToAnswer)
            })

            socket.on('resolvedQuestion', (data) => {
                console.log("Resolved Question: ", data)
                setResolveAnswers(true)

                setLeaderBoard(data.leaderBoard)
                
                setTimeout(() => {
                    //Check ob man unten den Usern ist die Richtig waren
                    data.correctUsers?.map(correctUser => {
                        if(correctUser == user.id){
                            setQuestionResolveMessage(true)

                            setTimeout(() => {
                                setQuestionResolveMessage(false)
                            }, 4500)
                        }
                    })

                    //Check ob man unten den Usern ist die Falsch waren
                    data.wrongUsers?.map(wrongUser => {
                        if(wrongUser == user.id){
                            console.log("Schade! Du hast die Frage falsch beantwortet :(")
                            setQuestionResolveMessageWrong(true)

                            setTimeout(() => {
                                setQuestionResolveMessageWrong(false)
                            }, 4500)
                        }
                    })
                }, 0)             
            })

            socket.on('joinedRoom', (data) => {
                console.log("Joined Room", data.userId)
                console.log("Participants: ", data.participants)
                setParticipants(data.participants)
                setLeaderBoard(data.leaderBoard)
            })

            socket.on('endedQuiz', (data) => {
                navigation.navigate('HallOfFameScreen',{quizId: data.quizId})
            })

        }
        else console.log("Keine Gültige ID")
    }
        return () => {
          // Wenn Seite geschlossen wird - alle listener aus
          socket.off('changedPage');
          socket.off('joinedRoom')
          socket.emit("leaveRoom",{quizId: quizId, userId: user?.id})
        };
        
    },[])

    useEffect(() => {
        //Check ob App im vordergrund ist oder nicht
        const subscription = AppState.addEventListener("change", nextAppState => {
          if ( appState.current.match(/inactive|background/) && nextAppState === "active") {
            socket.emit("joinRoom", {quizId: quizId, userId: user?.id}) //User ist wieder in der App
            getQuizDataAndRefreshState()
          }else{
            socket.emit("leaveRoom",{quizId: quizId, userId: user?.id}) //User verlässt App
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
            setQuizStarted(data.payload.startedQuiz)
            setLeaderBoard(data.payload.leaderboard)
        })

    })

    const sendAnswerToServer = ((option: OptionType) => {
        setOptionVergleich(option.index)
        socket.emit('giveAnswer', {quizId: quizId, userId: user?.id, questionIndex , option})
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
        <Box style={style.viewStyle} backgroundColor="gray.200">
            {quizData?.isOver ? <Box></Box>: <Box  style={style.viewStyle} w={'100%'} backgroundColor="gray.200">
            <Box /* Top Bar */ height={40} w={'100%'} backgroundColor={'red.700'} borderBottomRadius={30}>        
                <Pressable marginLeft={4} marginTop={16} height={10} onPress={() => navigation.goBack()}> 
                    <HStack  alignItems={'center'} >
                        <Box backgroundColor={'rgba(255,255,255, 0.6)'} borderRadius={20} w={8} h={8} marginTop={2} alignItems={'center'} justifyContent={'center'}>
                            <ChevronLeftIcon  size="5" color="red.700" />
                        </Box>
                        {quizStarted ? 
                            <Box>
                                <Text fontSize={20} marginLeft={4} bold>{quizData.title}</Text>
                            </Box> 
                        : 
                            <Box>
                                <Text fontSize={30} marginLeft={4} bold>Warte Raum</Text>
                            </Box>
                        }
                    </HStack>
                </Pressable>

                {quizStarted && <HStack margin={6} marginTop={6} justifyContent={'space-between'}>
                        {quizData && <Text color={'white'} alignSelf={'flex-end'} marginRight={2} bold>{participants.length} Teilnehmer</Text>}
                        <HStack alignItems={'center'} justifyContent={'space-around'}>  
                            <WarningOutlineIcon size="4" color="white" />
                            <Text color={'white'} marginLeft={2} bold onPress={handleOpen}>{secondsToAnswer}</Text>
                        </HStack>
                        <Text color={'white'} bold onPress={handleOpen}>Leaderboard</Text>
                    </HStack>}
            </Box>


            {quizStarted ? 
            // Quiz Room
            <VStack w={'100%'} alignItems={'center'} justifyContent={'center'}>
                {quizData && <Text color={'black'} fontSize={20} bold margin={4} marginBottom={2} marginTop={10}>{quizData?.questions[questionIndex]?.question} <Text fontWeight={'light'} fontSize={14}>Frage {questionIndex+1}/{quizData.questions.length}</Text> </Text>}

                <ScrollView>
                    {resolveAnswers && quizData?.questions[questionIndex]?.options.map((option,i)=> {                 
                        return (
                            <Pressable key={ Math.random()}>{({isPressed }) => {
                                return <HStack bg={option.isRightAnswer && resolveAnswers ?'green.600': !option.isRightAnswer && resolveAnswers ? 'red.500':''}  style={{transform: [{scale: isPressed ? 0.96 : 1}], borderWidth:1}} rounded='20' borderColor={option.isRightAnswer && resolveAnswers ?'green.600': !option.isRightAnswer && resolveAnswers ? 'red.500':''} marginTop={5} w={300} padding={4}> 
                                            <Text color={option.isRightAnswer && resolveAnswers ?'white': !option.isRightAnswer && resolveAnswers ? 'white':'gray'} fontWeight="medium" fontSize="xl">
                                                {getLetter(option.index)}: 
                                            </Text>
                                            <Text style={{marginLeft:'auto',marginRight:'auto'}} color={option.isRightAnswer && resolveAnswers ?'white': !option.isRightAnswer && resolveAnswers ? 'white':'gray'} fontWeight="medium" fontSize="xl">
                                                {option.value}
                                            </Text>
                                        </HStack>

                                }}
                            </Pressable>
                        )
                    })}

                    {!resolveAnswers && quizData?.questions[questionIndex]?.options.map((option,i)=> {                 
                        return (
                            <Pressable onPress={() => sendAnswerToServer(option)} key={ Math.random()}>{({ isHovered, isFocused, isPressed }) => {
                                return <HStack bg={optionVergleich == option.index ? '#B91C1B':''}  style={{transform: [{scale: isPressed ? 0.96 : 1}], borderWidth:2, borderColor:'#B91C1B'}} rounded='20' borderColor="red.700" marginTop={5} w={300} padding={4}> 
                                    <Text color={optionVergleich == option.index ? 'white':"black"} fontWeight="medium" fontSize="xl">
                                        {getLetter(option.index)}: 
                                    </Text>
                                    <Text style={{marginLeft:'auto',marginRight:'auto'}} color={optionVergleich == option.index ? 'white':"black"} fontWeight="medium" fontSize="xl">
                                        {option.value}
                                    </Text>
                                </HStack>
                                }}
                            </Pressable>
                        )
                    })}
                </ScrollView>
            </VStack>
            : 
                // Waiting Room
                <Box w={'90%'} margin={4} marginTop={10}>
                    
                    <Box>
                        <Text color={'black'} fontSize={20} bold>{quizData.title}</Text>
                        <Text color={'black'} marginTop={2}>In diesem Quiz gibt es {quizData.questions.length} Fragen</Text>
                    </Box>

                    <Box /*TrennWand*/ h={.4} w={'100%'} backgroundColor={'gray.400'} marginLeft={'auto'} marginRight={'auto'} marginTop={4} marginBottom={4}></Box>


                    <Box>
                        <Text color={'black'} fontSize={20} bold>Hallo {user.name},</Text>
                        <Text marginTop={2} color={'black'}>Das Quiz wurde noch nicht gestartet und du befindest dich im Warteraum. Warte darauf, dass der Dozent das Quiz startet. Sobald das Quiz los geht, läuft der Timer zum antworten, also sei schnell!</Text>
                    </Box>

                    <Box /*TrennWand*/ h={.4} w={'100%'} backgroundColor={'gray.400'} marginLeft={'auto'} marginRight={'auto'} marginTop={4} marginBottom={4}></Box>

                    <Text color={'black'} fontSize={20} bold marginBottom={4}>{participants.length} Teilnehmer</Text>
                    <ScrollView>
                        <HStack style={{flexWrap: 'wrap',}}>                  
                            {participants.map((participant,i)=> {                 
                                return (
                                    <UserAvatar key={i} userId={participant}/>
                                )
                            })}
                        </HStack>
                    </ScrollView>
                </Box>
            }

            <Modal isOpen={questionResolveMessage} size={'md'}>
                <LottieView source={require('../../assets/animations/coinAnimation.json')} autoPlay loop speed={0.5} />
                <Box marginTop={40} backgroundColor={'gray.300'} borderRadius={10} padding={2}>
                    <Text fontSize={16} color={'black'} bold>Hurra! Du hast die Frage richtig beantwortet!</Text>
                    <Text fontSize={16} color={'black'} bold>Du erhälst 10 Punkte</Text>
                </Box>
            </Modal>

            <Modal isOpen={questionResolveMessageWrong} size={'md'}>
                <Box height={300} width={300}>
                    <LottieView source={require('../../assets/animations/cryMorty.json')}  autoPlay loop speed={0.5} />
                </Box>
                <Box backgroundColor={'gray.300'} borderRadius={10} padding={2}>
                    <Text fontSize={16} color={'black'} bold>Schade! Du hast die Frage falsch beantwortet :C</Text>
                    <Text fontSize={16} color={'black'} bold>Für dich gibt es diesmal keine Punkte!</Text>
                </Box>
            </Modal>

            <Modal isOpen={modalOpen} onClose={handleClose}>
                <Box style={{backgroundColor:'white', width: '90%', borderRadius: 30, height: '70%'}}>
                    <HStack textAlign={'center'} height={20} display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
                        <MoonIcon size="5" mt="0.5" color="red.600" />
                        <Text color={'black'} fontSize={20} bold>Leaderboard</Text>
                        <MoonIcon size="5" mt="0.5" color="red.600"  />
                    </HStack>

                    <Box height={1} width={'90%'} alignSelf={'center'}  borderBottomColor={'gray.400'} borderBottomWidth={.2}></Box>

                    <ScrollView marginLeft={5} marginRight={5}>
                        {leaderBoard.map((user, index) => {
                            return <HStack justifyContent={'space-between'} marginTop={4}>
                                <Text color={'black'}>{index+1}. {'        '} {user.userId}</Text>
                                <Text color={'black'}>{user.points}</Text>
                            </HStack>
                        })}
                    </ScrollView>
                </Box>
            </Modal>
            </Box>} 
        </Box>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems:'center' },
});


