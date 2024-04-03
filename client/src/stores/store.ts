import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./slices/basketSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import menuReducer from "./slices/menuSlice";
import restaurantReducer from "./slices/restaurantSlice";
import reservationSlice from "./slices/reservationSlice";
import { reservationDetailsSlice } from "./slices/reservationDetailsSlice";
import { userSlice } from "./slices/userSlice";




export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer,
        reservationDetails: reservationDetailsSlice.reducer,
        user: userSlice.reducer,
        menu: menuReducer,
        restaurant: restaurantReducer,
        reservations: reservationSlice
        
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector