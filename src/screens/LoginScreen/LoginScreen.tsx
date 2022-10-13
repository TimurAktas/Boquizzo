import { Box, Pressable,Text } from 'native-base';
import React, {} from 'react';
import { StyleSheet, View } from 'react-native';


export const LoginScreen: React.FC = () => {
    return (
        <View style={style.viewStyle}>
            <Pressable maxW="96" w={'70%'} onPressOut={() => console.log("Pressed")}> 
                {({ isHovered, isFocused, isPressed}) => { 
                    return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                    <Text color="white" fontWeight="medium">
                        Benutzerkennung
                    </Text>
                    </Box>
                }}
            </Pressable>

             <Pressable maxW="96" w={'70%'} marginTop={10} onPressOut={() => console.log("Pressed")}> 
                {({ isHovered, isFocused, isPressed}) => { 
                    return <Box bg={isPressed ? "red.800" : isHovered ? "red.800" : "red.700"} style={{ transform: [{ scale: isPressed ? 0.96 : 1}] }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300" justifyContent={'center'} alignItems= {'center'}>
                    <Text color="white" fontWeight="medium">
                        Login mit Email
                    </Text>
                    </Box>
                }}
            </Pressable>
        </View>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems: 'center', justifyContent:'center',backgroundColor: 'gray' },
});