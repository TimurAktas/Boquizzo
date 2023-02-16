import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL, BASE_URL } from '../../config/config';
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
            const response = await fetch(`${API_URL}/users/`+ userId);
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


export const createNewUser = createAsyncThunk('quiz/createNewUser', async (data:{nickname: string, password: string, name:string, surname:string, uni:string, semester:number}, thunkApi)  => {
    console.log("createNewUser With :", data)
    //accessToken

    try{
        const User = {
            nickname: data.nickname,
            name: data.name,
            surname: data.surname,
            password: data.password,
            accessToken: '12312j3hb1d9a',
            semester: data.semester,
            uni: data.uni
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(User),
        };

        await fetch(
        `${API_URL}/users/createUser`, requestOptions)
        .then(response => {
            response.json()
                .then(data => {
                    console.log("Post created at : ", data);
                });
        })
        
    }
    catch(error: any){
        console.warn('Error in getUserWithAccessToken', error)
    }
})