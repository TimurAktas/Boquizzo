import { Box, Pressable,Text } from 'native-base';
import React, {} from 'react';
import { StyleSheet, View } from 'react-native';


export const QuizCreatorScreen: React.FC = () => {
    return (
        <View style={style.viewStyle}>
           <Text>ERSTELLE EIN QUIZ</Text>
        </View>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems: 'center', justifyContent:'center',backgroundColor: 'gray' },
});