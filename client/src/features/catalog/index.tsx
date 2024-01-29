import { useEffect } from "react"
import RestaurantList from "../../components/RestaurantsList";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { fetchRestaurantsAsync, restaurantSelectors } from "./restaurantSlice";
import LoadingComponent from "../../components/LoadingComponent";
import CreateRestaurant from "../../components/CreateRestaurant";
import styles from "./styles.module.css"

export default function Catalog() {
    const restaurants = useAppSelector(restaurantSelectors.selectAll);
    const {restaurantsLoaded, status} = useAppSelector(state => state.restaurant);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!restaurantsLoaded) {
            dispatch(fetchRestaurantsAsync())
        } 
    }, [restaurantsLoaded, dispatch])

    if (status.includes("pending")) return <LoadingComponent message="Loading restaurants.."/>

    return (
        <div className={styles.container}>
            <CreateRestaurant/>
            <RestaurantList restaurants={restaurants} />
        </div>
    )
}