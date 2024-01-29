import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Restaurant } from "../../types/restaurant";
import requests from "../../API/requests";
import { RootState } from "../../stores/store";


const restaurantsAdapter = createEntityAdapter<Restaurant>({
    selectId: e => e.id
})

export const fetchRestaurantAsync = createAsyncThunk<Restaurant, {restaurantId: number}>(
    "menu/fetchRestaurantAsync",
    async ({restaurantId}, thunkAPI) => {
        try {
            return await requests.RestaurantRequests.getRestaurant(restaurantId);
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchRestaurantsAsync = createAsyncThunk<Restaurant[]>(
    "menu/fetchRestaurantsAsync",
    async (_, thunkAPI) => {
        try {
            return await requests.RestaurantRequests.getRestaurants();
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

const restaurantSlice = createSlice({
    name: "restaurants",
    initialState: restaurantsAdapter.getInitialState ({
        restaurantsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchRestaurantAsync.pending, (state) => {
            state.status = "pendingfetchRestaurant"
        });
        builder.addCase(fetchRestaurantAsync.fulfilled, (state, action) => {
            restaurantsAdapter.upsertOne(state, action.payload)
            state.status = 'idle'
        });
        builder.addCase(fetchRestaurantAsync.rejected, (state) => {
            state.status = 'idle'
        });
        builder.addCase(fetchRestaurantsAsync.pending, (state) => {
            state.status = 'pendingFetchRestaurants'
        });
        builder.addCase(fetchRestaurantsAsync.fulfilled, (state, action) => {
            restaurantsAdapter.setAll(state, action.payload)
            state.status = "idle"
            state.restaurantsLoaded = true;
        });
        builder.addCase(fetchRestaurantsAsync.rejected, (state) => {
            state.status = 'idle'
        });
    })
})


export const restaurantSelectors = restaurantsAdapter.getSelectors((state: RootState) => state.restaurant)

export default restaurantSlice.reducer