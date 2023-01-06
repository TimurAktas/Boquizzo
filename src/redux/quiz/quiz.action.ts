import { Platform } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config/config';

export const getQuizData = createAsyncThunk('quiz/getQuizData', async (quizId:String, thunkApi) => {
    try{
        const response = await fetch('http://localhost:3001/api/quizzes/'+quizId);
        const json = await response.json();
        console.log("JSON: ",json)
        if(json) return json;
    }
    catch(error: any){
        console.warn('Error in getQuizData', error)
    }
})