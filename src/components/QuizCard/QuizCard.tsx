import { useNavigation } from "@react-navigation/native";
import { Text, Box, Pressable, Badge, HStack, CheckIcon, SunIcon } from "native-base";
import { HomeStackParams } from "../../navigation/HomeStackNavigation/HomeStackNavigation";
import { QuizType, QuizzieType } from "../../redux/quiz/quiz.types";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from "react";
import { UserType } from "../../redux/user/user.types";

export type QuizCardType = {
    title: string,
    quizId: string,
    creatorId: string,
    questions: QuizzieType[],
    currentPageIndex: number,
    participants: UserType[]
};

export const QuizCard: React.FC<QuizCardType> = (data) => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

    useEffect(() => {
        console.log("Das ist ist in QuizCard: ", data)
    },[])

    return (
        <Pressable w={'90%'}  marginLeft={'auto'} marginRight={'auto'}  marginTop={4} onPress={() => navigation.navigate('QuizroomScreen',{quizId: data.quizId})}> 
            {({ isHovered, isFocused, isPressed}) => { 
                return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} rounded="20" shadow={3}>
                    
                <Box backgroundColor={'red.700'} height={24} borderRadius={20} padding={4}>
                    <HStack backgroundColor={'rgba(255,255,255, 0.6)'} maxW={24} borderRadius={30} padding={2} alignSelf={'flex-end'}>
                        <SunIcon size="3" mt="0.5" color="black" />
                        <Text color="black" fontSize={10}> 25:20 Min</Text>
                    </HStack >

                    <HStack marginTop={'auto'} marginBottom={'auto'}>
                        <Text fontSize={16} bold>{data.title}</Text>
                    </HStack>
                
                </Box>

                <Box padding={4}>
                    <HStack>
                        <Text color="black">Quiz ID </Text>
                        <Text color="black" bold> {data?.quizId}</Text>
                    </HStack>

                    <HStack justifyContent={'space-between'}>
                        <Box>
                            <HStack marginTop={2}>
                                <Text color="black">Teilnehmer </Text>
                                <Text color="black" bold> {data?.participants?.length}</Text>
                            </HStack>

                            <HStack marginTop={2}>
                                <Text color="black">Frage </Text>
                                <Text color="black" bold> {data?.currentPageIndex+1}/{data.questions?.length}</Text>
                            </HStack>
                        </Box>

                        <Box backgroundColor={'red.700'} padding={2} borderRadius={20} w={32} h={10} marginTop={4}>
                            <Text bold marginLeft={'auto'} marginRight={'auto'}>Beitreten</Text>
                        </Box>

                    </HStack>
                </Box>


            </Box>
            }}
        </Pressable>
      );
};
