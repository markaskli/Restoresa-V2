import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../types/basket";
import requests from "../../API/requests";
import { ReservationDTO } from "../../types/reservation";

interface BasketSlice {
    basket: Basket | null
    status: string
}

const initialState : BasketSlice = {
    basket: null,
    status: "idle"
}

export const fetchBasketItemsAsync = createAsyncThunk(
    'basket/fetchBasketItemsAsync',
    async (_, thunkAPI) => {
        try {
            return await requests.Basket.get();
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number, restaurantId: number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1, restaurantId}, thunkAPI) => {
        try {
            return await requests.Basket.addItem(productId, quantity, restaurantId);
        }
        catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, name?: string}>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity}, thunkAPI) => {
        try {
            return await requests.Basket.removeItem(productId, quantity);
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const addReservationDetailsAsync = createAsyncThunk<Basket, ReservationDTO>(
    'basket/addReservationDetailsAsync',
    async (reservationDetails, thunkAPI) => {
        try {
            return await requests.Basket.addReservationDetails(reservationDetails);
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        clearBasket: (state) => {
            state.basket = null
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = "pendingAddItem" + action.meta.arg.productId;
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = "pendingRemoveItem" + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            state.status = "idle";
            const {productId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(item => item.productId === productId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1);            
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(fetchBasketItemsAsync.pending, (state) => {
            state.status = "pendingFetchItems"; 
        });
        builder.addCase(fetchBasketItemsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.basket = action.payload;
        });
        builder.addCase(fetchBasketItemsAsync.rejected, (state) => {
            state.status = 'idle'
        });
        builder.addCase(addReservationDetailsAsync.pending, (state) => {
            state.status = "pendingAddReservationDetails"; 
        });
        builder.addCase(addReservationDetailsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
        });
        builder.addCase(addReservationDetailsAsync.rejected, (state) => {
            state.status = 'idle'
        })
    })
})


export const {setBasket, clearBasket} = basketSlice.actions;
