import { Box, Input, Pressable,Text,Image } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { authUser } from '../../redux/auth/auth.action';
import { AppDispatch } from '../../redux/store';

export const LoginScreen: React.FC = () => {
    const [matrikelnummer, setMatrikelnummer ] = useState('')
    const [password, setPassword ] = useState('')
    const dispatch: AppDispatch = useDispatch();
    const hsboLogo = require('../../assets/img/hsbologo.png');

    const onChangeMatrikelnummer = (event:any) => {
        setMatrikelnummer(event)
    }

    const onChangePassword = (event:any) => {
        setPassword(event)
    }

    const loginUser = async () => {
        console.log("bin hier drin")
        await dispatch(authUser({matrikelnummer: matrikelnummer, password: password}))
    } 

    return (
        <View style={style.viewStyle}>
            <Image source={hsboLogo} alt={'hsboLogo'} height="40" width="80" marginTop={40} />
           
            <Box>
                <Text  marginTop={4}  color={'black'}>Matrikelnummer</Text>
                <Input marginTop={2} placeholder="Matrikelnummer" w="80%" onChangeText={onChangeMatrikelnummer} color={'black'}/>
                <Text  marginTop={4}  color={'black'}>Passwort</Text>
                <Input marginTop={2} placeholder="Passwort" w="80%" onChangeText={onChangePassword} color={'black'}/>
            </Box>

            <Pressable maxW="96" w={'70%'} marginTop={10} onPress={loginUser}> 
                {({ isHovered, isFocused, isPressed}) => { 
                    return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                    <Text color="white" fontWeight="medium">
                        Login
                    </Text>
                    </Box>
                }}
            </Pressable>
        </View>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems: 'center',backgroundColor: 'white' },
});