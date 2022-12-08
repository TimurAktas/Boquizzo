import { useNavigation } from "@react-navigation/native";
import { VStack,Text, Box, Pressable } from "native-base";
import { HomeStackParams } from "../../navigation/HomeStackNavigation/HomeStackNavigation";
import { QuizType } from "../../redux/quiz/quiz.types";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const QuizCard: React.FC<QuizType> = (quizData) => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    
    return (
        <VStack w={'100%'} alignItems={'center'} justifyContent={'center'} >
            <Text fontSize={20} color={'black'}>Es wurde ein Quiz gefunden</Text>
        
            <Pressable w={'100%'} onPressOut={() => navigation.navigate('QuizroomScreen',{quizId: quizData.quizId})}> 
                {({ isHovered, isPressed}) => { 
                    return <Box  
                        marginLeft={'auto'} 
                        marginRight={'auto'} 
                        marginTop={4} 
                        w={'90%'} 
                        height={200} 
                        backgroundColor={'white'} 
                        shadow={4} 
                        padding={4} 
                        borderRadius={10} 
                        style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} 
                        p="5" 
                        rounded="8" 
                        borderWidth="1" 
                        borderColor="coolGray.300" 
                        justifyContent={'center'} 
                        alignItems= {'center'}
                    >
                        <Text color={'black'}>Titel des Quiz TODO</Text>
                        <Text color={'black'}>Teilnehmerzahl: {quizData.participants?.length}</Text>
                        <Text color={'black'}>Ersteller: {quizData.creatorId}</Text>
                    </Box>
                }}
            </Pressable>

        </VStack>
      );
};
