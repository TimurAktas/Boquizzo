import React, {} from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const LoginScreen: React.FC = () => {
    return (
        <View style={style.viewStyle}>
            <Text>Login</Text>
        </View>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems: 'center', justifyContent:'center',backgroundColor: 'gray' },
});