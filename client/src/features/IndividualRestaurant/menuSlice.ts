import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../app/models/product";
import requests from "../app/API/requests";
import { RootState } from "../app/store/store";
import { Restaurant } from "../app/models/restaurant";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[], {restaurantId: number}>(
    "menu/fetchProductsAsync",
    async ({restaurantId}, thunkAPI) => {
        try {
            return await requests.Menu.getRestaurantProducts(restaurantId)
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

const menuSlice = createSlice({
    name: "menu",
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: "idle",
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle'
        })     
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.menu)

export default menuSlice.reducer