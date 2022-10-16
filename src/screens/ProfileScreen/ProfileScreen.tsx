import { Box, HStack, Stack, VStack,Text, ScrollView} from 'native-base';
import React, {} from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from "native-base";

export const ProfileScreen: React.FC = () => {
    return (
        <Box style={style.viewStyle} backgroundColor="primary.50">
            <HStack width={'100%'} backgroundColor="white" shadow={7} padding={4} justifyContent='space-between'>
                <HStack>
                    <Avatar bg="green.500" size="md" source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}}>
                        AJ
                    </Avatar>
                
                    <VStack marginLeft={2}>
                        <Text color={'black'}>Name Nachname</Text>
                        <Text color={'gray.500'} fontSize={12}>Studiengang</Text>
                    </VStack>
                </HStack>

                <VStack>
                    <Text color={'black'}>Quizpunkte</Text>
                    <Text color={'black'}>420.000</Text>
                </VStack>

            </HStack>

            <Text color={'black'} bold fontSize={14} margin={4}>Abgeschlossene Quiz's</Text>
            <ScrollView marginLeft={4} marginRight={4} showsVerticalScrollIndicator={false}> 
                <HStack h={140} width={'100%'} backgroundColor='gray.300' marginTop={4} borderRadius={20}></HStack>
                <HStack h={140} width={'100%'} backgroundColor='gray.300' marginTop={4} borderRadius={20}></HStack>
                <HStack h={140} width={'100%'} backgroundColor='gray.300' marginTop={4} borderRadius={20}></HStack>
                <HStack h={140} width={'100%'} backgroundColor='gray.300' marginTop={4} borderRadius={20}></HStack>
                <HStack h={140} width={'100%'} backgroundColor='gray.300' marginTop={4} borderRadius={20}></HStack>
                <HStack h={140} width={'100%'} backgroundColor='gray.300' marginTop={4} borderRadius={20}></HStack>
                <HStack h={140} width={'100%'} backgroundColor='gray.300' marginTop={4} borderRadius={20}></HStack>
            </ScrollView>
        </Box>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1},
});