import { createSlice } from '@reduxjs/toolkit';
import { authUser, logoutUser } from './auth.action';
import { AuthState } from './auth.types';

const initialState: AuthState = {
    data: null,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.data.idToken = null;
            state.data.refreshToken = null;
            state.data.token = null;
        });
    },
});