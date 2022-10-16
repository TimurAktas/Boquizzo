import { AddIcon, Box, Button, Center, CheckIcon, FormControl, HStack, Input, Modal, Pressable,ScrollView,Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Fab } from 'native-base';
import Icon from 'react-native-ionicons'

export const QuizCreatorScreen: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [quizquestions, setQuizQuestions] = useState([
        {name:'Timur', antwort: 'zwei'},
        {name:'Timur', antwort: 'zwei'},
        {name:'Timur', antwort: 'zwei'},
        {name:'Timur', antwort: 'zwei'},
        {name:'Timur', antwort: 'zwei'},
        {name:'Timur', antwort: 'zwei'}
    ])

    return (
        <Box style={style.viewStyle} backgroundColor="primary.50">
            <Pressable onPress={() => setShowModal(true)}>
                <HStack alignSelf={'flex-end'} padding={4}>
                    <AddIcon size="5" mt="0.5" color="black" />
                    <Text color={'black'}>Frage hinzufügen</Text>
                </HStack>
            </Pressable>

            <ScrollView showsVerticalScrollIndicator={false}>
                {quizquestions.map(quiz => {
                    return <Box key={quiz.name} h={100} w={'90%'} backgroundColor={'amber.200'} borderRadius={20} marginTop={4} padding={4} alignSelf={'center'}>
                        <Text color={'black'}>{quiz.name}</Text>
                        <Text color={'black'}>{quiz.antwort}</Text>
                    </Box>
                })}

            </ScrollView>
 
            {quizquestions.length > 0 && <Fab onPress={() => setShowModal(true)} bgColor={'red.700'} renderInPortal={false} shadow={2} size="lg" label="Quiz starten" />}
            
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Frage hinzufügen</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input />
                        </FormControl>
                        <FormControl mt="3">
                        <FormControl.Label>Email</FormControl.Label>
                        <Input />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowModal(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            setShowModal(false);
                        }}>
                            Save
                        </Button>
                        </Button.Group>
                    </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Center>
        </Box>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1},
});