import { Platform } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getQuizWithID = createAsyncThunk('quiz/getQuizWithId', async () => {
    return  {question: "string", answers: "string"}
    return Promise.reject();
});

