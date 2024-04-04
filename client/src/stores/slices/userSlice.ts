import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { LoginDto, User } from "../../types/user";
import requests from "../../API/requests";
import { setBasket } from "./basketSlice";
import { router } from "../../routes/Route";
import { toast } from "react-toastify";

interface AccountSlice {
    user: User | null
}

const initialState : AccountSlice = {
    user: null
}

export const signInUser = createAsyncThunk<User, LoginDto>(
    'user/createUser',
    async (clientData, thunkAPI) => {
        try {
            const userDto = await requests.User.login(clientData)
            const {basket, ...user} = userDto
            if (basket) thunkAPI.dispatch(setBasket(basket))
            localStorage.setItem('user', JSON.stringify(user))
            return user

        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'user/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const userDto = await requests.User.currentUser();
            const {basket, ...user} = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null
            localStorage.removeItem('user')
            router.navigate('/')
        },
        setUser: (state, action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims["role"];
            state.user = {...action.payload, role: typeof(roles) === 'string' ? [roles] : roles};
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null
            localStorage.removeItem('user')
            toast.error("Session expired - please login again")
            router.navigate('/')
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims["role"];
            state.user = {...action.payload, role: typeof(roles) === 'string' ? [roles] : roles};
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            toast.error("Incorrect credentials")
            console.log(action.payload)   
        })
    }
})

export const {signOut, setUser} = userSlice.actions