import { useRoute } from '@react-navigation/native';
import { Badge, Box, Flex, HStack, Pressable, Spacer, Text, VStack } from 'native-base';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getQuizData } from '../../redux/quiz/quiz.action';
import { AppDispatch, RootState } from '../../redux/store';
import { socket } from '../../utils/Socket';



export const QuizroomScreen: React.FC = ({ route, navigation }:any) => {
    const quizId =  route.params.quizId
    const dispatch: AppDispatch = useDispatch();
    const quizData = useSelector((state: RootState) => state.quiz.data);
    const [questionIndex, setQuestionIndex] = React.useState(0)

    useEffect(() => {
        dispatch(getQuizData(quizId))
        console.log(quizData)
        
        socket.emit("joinRoom", {quizId: quizId, userId: "123"})

        socket.on('changeQuestion', (arg) => {
            setQuestionIndex(arg)
        })


        socket.on('message', (msg) => {
            console.log("erhalte eine Nachricht zurück: ", msg)
        })

        return () => {
          socket.off('joinedRoom');
          socket.off('message');
          socket.off('changeQuestion')
        };
    },[])

    return (
        <Box style={style.viewStyle} backgroundColor="primary.50">
            <VStack w={'100%'} marginTop={10} alignItems={'center'} justifyContent={'center'} >
                
                {quizData && <Text color={'black'}>{quizData.creatorId}</Text>}

                {quizData && <Text color={'black'}>{quizData?.questions[questionIndex]?.question} </Text>}

                {quizData?.questions[questionIndex]?.options.map((option,i)=> {
                    let buchstabe = ''
                    switch(option.index) {
                        case 1:
                            buchstabe = 'A'
                        break;
                        case 2:
                            buchstabe = 'B'
                        break;
                        case 3:
                            buchstabe = 'C'
                        break;
                        case 4:
                            buchstabe = 'D'
                        break;
                        case 5:
                            buchstabe = 'E'
                        break;
                        case 6:
                            buchstabe = 'F'
                        break;
                        default:
                        // code block
                    }
                    
                    return (
                        // <VStack key={i} style={{height:100,width:'90%',backgroundColor:'yellow'}}>
                        //     <Text color={'black'}>{buchstabe}</Text>
                        //     <Text color={'black'}> {option.isRightAnswer?'True':'False'}{option.value}</Text>      
                        // </VStack>

                        <Pressable>{({ isHovered, isFocused, isPressed }) => {
                            return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{transform: [{scale: isPressed ? 0.96 : 1}]}} rounded="8" shadow={3} borderColor="coolGray.300" marginTop={5} w={300} padding={4}> 
                                        <Text color="coolGray.500" fontWeight="medium" fontSize="xl">
                                            {buchstabe}: {option.value}
                                        </Text>
                                    </Box>;
                            }}
                        </Pressable>
                    )
                })}
            </VStack>
        </Box>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems:'center' },
});