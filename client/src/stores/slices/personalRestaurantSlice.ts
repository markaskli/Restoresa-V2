import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Restaurant } from "../../types/restaurant";
import requests from "../../API/requests";
import { RootState } from "../store";

const personalRestaurantsAdapter = createEntityAdapter<Restaurant>({
    selectId: e => e.id
})

export const fetchRestaurantsOfUser = createAsyncThunk<Restaurant[], {userId: string}>(
    "menu/fetchRestaurantOfUser",
    async ({userId}, thunkAPI) => {
        try {
            return await requests.RestaurantRequests.getRestaurantsOfUser(userId)
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

const personalRestaurantSlice = createSlice({
    name: 'personalRestaurantSlice',
    initialState: personalRestaurantsAdapter.getInitialState({
        restaurantsLoaded: false,
        status: 'idle'
    }),
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchRestaurantsOfUser.pending, (state) => {
            state.status = 'pendingFetchRestaurantsOfUser'
        });
        builder.addCase(fetchRestaurantsOfUser.fulfilled, (state, action) => {
            personalRestaurantsAdapter.setAll(state, action.payload)
            state.status = "idle"
            state.restaurantsLoaded = true;
        });
        builder.addCase(fetchRestaurantsOfUser.rejected, (state) => {
            state.status = 'idle'
        });
    }
})

export const personalRestaurantSelectors = personalRestaurantsAdapter.getSelectors((state: RootState) => state.personalRestaurant)
export default personalRestaurantSlice.reducer