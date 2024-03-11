import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import menuReducer from "./slices/menuSlice";
import restaurantReducer from "./slices/restaurantSlice";
import reservationDetailsSlice from "./slices/reservationDetailsSlice";
import reservationSlice from "./slices/reservationSlice";




export const store = configureStore({
    reducer: {
        basket: basketReducer,
        menu: menuReducer,
        restaurant: restaurantReducer,
        reservationDetails: reservationDetailsSlice,
        reservations: reservationSlice
        
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector