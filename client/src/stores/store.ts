import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../features/OrderPage/basketSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import menuReducer from "../features/IndividualRestaurant/menuSlice";
import restaurantReducer from "../features/Catalog/restaurantSlice";



export const store = configureStore({
    reducer: {
        basket: basketReducer,
        menu: menuReducer,
        restaurant: restaurantReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector