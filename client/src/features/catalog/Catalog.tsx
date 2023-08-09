import { useEffect, useState } from "react"
import { Restaurant } from "../app/models/restaurant";
import RestaurantList from "./RestaurantList";
import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/store/store";
import { fetchRestaurantsAsync, restaurantSelectors } from "./restaurantSlice";
import LoadingComponent from "../app/layout/LoadingComponent";

export default function Catalog() {
    const restaurants = useAppSelector(restaurantSelectors.selectAll);
    const {restaurantsLoaded, status} = useAppSelector(state => state.restaurant);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!restaurantsLoaded) dispatch(fetchRestaurantsAsync())
    }, [restaurantsLoaded, dispatch])

    if (status.includes("pending")) return <LoadingComponent message="Loading restaurants.."/>

    return (
        <RestaurantList restaurants={restaurants} />
    )
}