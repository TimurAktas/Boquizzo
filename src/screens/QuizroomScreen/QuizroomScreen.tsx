import { Box, Pressable,Text } from 'native-base';
import React, {} from 'react';
import { StyleSheet, View } from 'react-native';


export const QuizroomScreen: React.FC = () => {
    return (
        <View style={style.viewStyle}>
           <Text>QUIZROOM</Text>
        </View>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems: 'center', justifyContent:'center',backgroundColor: 'gray' },
});