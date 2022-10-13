import { AddIcon, Box, Center, CheckIcon, Input, Pressable,Text } from 'native-base';
import React, {} from 'react';
import { StyleSheet, View } from 'react-native';
import { Fab } from 'native-base';
import Icon from 'react-native-ionicons'

export const QuizCreatorScreen: React.FC = () => {
    return (
        <View style={style.viewStyle}>    
            <Fab bgColor={'red.700'} renderInPortal={false} icon={<AddIcon size="5" mt="0.5" color="white" />} shadow={2} size="lg" label="Frage hinzufügen" />
        </View>
    );
};

const style = StyleSheet.create({
    viewStyle: { flex: 1, alignItems: 'center', justifyContent:'center',backgroundColor: 'lightgray' },
});