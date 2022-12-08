import { useNavigation } from "@react-navigation/native";
import { Text, Box, Pressable, Badge, HStack } from "native-base";
import { HomeStackParams } from "../../navigation/HomeStackNavigation/HomeStackNavigation";
import { QuizType } from "../../redux/quiz/quiz.types";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export const ActiveQuizCard: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    const quizData = useSelector((state: RootState) => state.quiz.data);

    return (
        <Pressable maxW="96" w={'90%'} marginTop={4} onPress={() => navigation.navigate('QuizroomScreen',{quizId: quizData?.quizId})}> 
                {({ isHovered, isFocused, isPressed}) => { 
                    return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                    <HStack alignItems="center">
                        <Badge colorScheme="green" _text={{ color: "white" }} variant="solid" rounded="4">
                            Aktiv seit 25:30 min
                        </Badge>
                    </HStack>
                    <Text color="black" mt="3" fontWeight="medium" fontSize="xl">
                        Quiz titel
                    </Text>
                        <HStack>
                            <Text color="black">Teilnehmer: </Text>
                            <Text color="black">{quizData?.participants?.length}</Text>
                        </HStack>
                        <HStack>
                            <Text color="black">Frage</Text>
                            <Text color="black">10/30</Text>
                        </HStack>
                    </Box>
                }}
            </Pressable>
      );
};
