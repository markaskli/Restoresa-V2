import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUser, LoginDto, User } from "../../types/user";
import requests from "../../API/requests";

interface AccountSlice {
    user: User | null
}

const initialState : AccountSlice = {
    user: null
}

export const SignIn = createAsyncThunk<User, LoginDto>(
    'user/createUser',
    async (clientData, thunkAPI) => {
        try {
            return await requests.User.login(clientData)
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)





export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // builder.addCase(SignIn.pending, (state, action) => {

        // });
        // builder.addCase(SignIn.fulfilled, (state, action) => {

        // });
        // builder.addCase(SignIn.rejected, (state, action) => {

        // });
    }
})