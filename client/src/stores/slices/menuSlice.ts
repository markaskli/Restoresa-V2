import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import requests from "../../API/requests";
import { Restaurant } from "../../types/restaurant";

interface MenuSlice {
    restaurant: Restaurant | null
    status: string
}

const initialState : MenuSlice = {
    restaurant: null,
    status: "idle"
}

export const fetchRestaurantAsync = createAsyncThunk<Restaurant, {restaurantId: number}>(
    "menu/fetchRestaurantAsync",
    async ({restaurantId}, thunkAPI) => {
        try {
            return await requests.RestaurantRequests.getRestaurant(restaurantId)
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)


export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchRestaurantAsync.pending, (state) => {
            state.status = 'pendingFetchRestaurant';
        });
        builder.addCase(fetchRestaurantAsync.fulfilled, (state, action) => {
            state.restaurant = action.payload
            state.status = 'idle';
        });
        builder.addCase(fetchRestaurantAsync.rejected, (state) => {
            state.status = 'idle'
        })     
    })
})


export default menuSlice.reducer