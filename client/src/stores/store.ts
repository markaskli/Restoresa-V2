import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./slices/basketSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import menuReducer from "./slices/menuSlice";
import restaurantReducer from "./slices/restaurantSlice";
import reservationSlice from "./slices/reservationSlice";
import { reservationDetailsSlice } from "./slices/reservationDetailsSlice";




export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer,
        menu: menuReducer,
        restaurant: restaurantReducer,
        reservationDetails: reservationDetailsSlice.reducer,
        reservations: reservationSlice
        
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector