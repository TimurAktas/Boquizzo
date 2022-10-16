import { createSlice } from '@reduxjs/toolkit';
import { getQuizWithID } from './quiz.action';
import { QuizState } from './quiz.types';

const initialState: QuizState = {
    data: null,
    loading: false,
    error: null,
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQuizWithID.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});
