import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config/config';
import { RootState } from '../store';
import jwt_decode from "jwt-decode";

type AccessTokenType = {
    user: string
}

export const getUserWithAccessToken = createAsyncThunk('quiz/getUserWithAccessToken', async (_, thunkApi)  => {
    const rootState = thunkApi.getState() as RootState;
    const accessToken = rootState.auth.data.token
 
    try{
        if(accessToken) { 
            var userId = jwt_decode<AccessTokenType>(accessToken).user; // Keine ahnung gerade wie man das fixed
            const response = await fetch('http://localhost:3001/users/'+ userId);
            const json = await response.json();
            console.log("User gefunden: ",json)
            return json;
        }
        else console.warn("Kein gültiger AccessToken")
        
    }
    catch(error: any){
        console.warn('Error in getUserWithAccessToken', error)
    }

    return Promise.reject();
})