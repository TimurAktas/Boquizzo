import { Platform } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config/config';

export const getAllQuizzes = createAsyncThunk('quiz/getAllQuizzes', async () => {
    const quizzoApiUrl = BASE_URL + 'api/quizzes'

    try{
        console.log("GET QUIZZES")
        const response = await fetch('http://localhost:3000/api/quizzes');
        const json = await response.json();
        console.log("RESULT: ",json)
        return json.movies;
    }
    catch(error: any){
        console.warn('Error in getAllQuizzes', error.response)
    }

    return Promise.reject();
})


export const getQuizData = createAsyncThunk('quiz/getQuizData', async (quizId:String, thunkApi) => {
    try{
        const response = await fetch('http://localhost:3001/api/quizzes/'+quizId);
        const json = await response.json();
        return json;
    }
    catch(error: any){
        console.warn('Error in getQuizData', error.response)
    }
})