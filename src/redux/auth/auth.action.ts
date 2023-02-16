import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../../config/config'

export const authUser = createAsyncThunk('auth/authUser', async (data:{nickname:string,password:string}, thunkApi) => {
    try{
      console.log("login: ", data)
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          'nickname': data.nickname.toLocaleLowerCase(),
          'password': data.password.toLocaleLowerCase()
        })
      };
      const response = await fetch(`${API_URL}/auth/login`, requestOptions);
      
      console.log("response", response)
      const loginuser = await response.json();

      console.log("Login:: ",loginuser)
  
      return loginuser
    }
    catch(error: any){
      console.warn('Error in authUser', error)
    }

    return Promise.reject();
})


export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkApi)  => {
    try{
        return null
    }
    catch(error: any){
        console.warn('Error in logout User', error.response)
    } 
  
  return Promise.reject();
})