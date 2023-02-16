import { useNavigation } from '@react-navigation/native';
import { Box, Input, Pressable,Text,Image, ScrollView, HStack, ChevronLeftIcon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { createNewUser } from '../../redux/user/user.action';

export const RegistrationScreen: React.FC = () => {
    // ID wird generiert
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName ] = useState('')
    const [surname, setSurname ] = useState('')
    const [uni, setUni ] = useState('')
    const [semester, setSemester ] = useState(null)

    const dispatch: AppDispatch = useDispatch();

    const navigation = useNavigation();

    const createNewUserr = async () => {
        await dispatch(createNewUser({nickname: nickname, password: password, name:name, surname:surname, uni:uni, semester:semester}))
            .then(() => navigation.goBack())
    } 

    return (
        <Box style={style.viewStyle} backgroundColor={'gray.200'}>

            <Box /* Top Bar */ height={40} w={'100%'} backgroundColor={'red.700'} borderBottomRadius={30}>        
                <Pressable marginLeft={4} marginTop={16} height={10} onPress={() => navigation.goBack()}> 
                    <HStack  alignItems={'center'} >
                        <Box backgroundColor={'rgba(255,255,255, 0.6)'} borderRadius={20} w={8} h={8} marginTop={2} alignItems={'center'} justifyContent={'center'}>
                            <ChevronLeftIcon  size="5" color="red.700" />
                        </Box>

                            <Box>
                                <Text fontSize={30} marginLeft={4} bold>Registration</Text>
                            </Box>
                    
                    </HStack>
                </Pressable>
            </Box>


            <ScrollView w={'100%'}>
                <Box marginTop={10} w={'90%'} alignSelf={'center'} backgroundColor="white" borderRadius={10} paddingLeft={4} paddingBottom={10} paddingRight={4}>
                    <Input borderRadius={10} borderWidth={.3} size={'xl'} marginTop={8} placeholder="Nickname" w="100%" onChangeText={e => setNickname(e)} color={'black'}/>
                    <Text color={'black'} marginTop={2} fontSize={14}>Wichtig: Nickname wird zum einloggen genutzt</Text>
                    <Input borderRadius={10} borderWidth={.3} size={'xl'} secureTextEntry={true} marginTop={4} placeholder="Passwort" w="100%" onChangeText={e => setPassword(e)} color={'black'}/>
                    <Input borderRadius={10} borderWidth={.3} size={'xl'} marginTop={8} placeholder="Name" w="100%" onChangeText={e => setName(e)} color={'black'}/>
                    <Input borderRadius={10} borderWidth={.3} size={'xl'} marginTop={8} placeholder="Nachname" w="100%" onChangeText={e => setSurname(e)} color={'black'}/>
                    <Input borderRadius={10} borderWidth={.3} size={'xl'} marginTop={8} placeholder="Uni/Hochschule" w="100%" onChangeText={e => setUni(e)} color={'black'}/>
                    <Input borderRadius={10} borderWidth={.3} size={'xl'} keyboardType={'numeric'} marginTop={8} placeholder="Semester" w="100%" onChangeText={e => setSemester(e)} color={'black'}/>

                    <Pressable alignSelf={'center'} w={'90%'} marginTop={10} onPress={createNewUserr}> 
                    {({ isHovered, isFocused, isPressed}) => { 
                        return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                        <Text color="white" fontWeight="medium">
                            Registrieren
                        </Text>
                        </Box>
                        }}
                    </Pressable>
                </Box>
            </ScrollView>
        </Box>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems: 'center' },
});