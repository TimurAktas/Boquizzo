import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const authUser = createAsyncThunk('auth/authUser', async (data:{matrikelnummer:string,password:string}, thunkApi) => {
    try{
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
          'matrikelnummer': data.matrikelnummer,
          'password': data.password.toLocaleLowerCase()
        })
      };
      const response = await fetch('http://localhost:3001/auth/login', requestOptions);
      
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
        localStorage.removeItem("user");
    }
    catch(error: any){
        console.warn('Error in logout User', error.response)
    } 
  
  return Promise.reject();
})