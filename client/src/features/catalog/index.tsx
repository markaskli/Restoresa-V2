import { useEffect, useState } from "react"
import RestaurantList from "../../components/RestaurantsList";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { fetchRestaurantsAsync, restaurantSelectors } from "../../stores/slices/restaurantSlice";
import LoadingComponent from "../../components/LoadingComponent";
import CreateRestaurant from "../../components/CreateRestaurant";
import styles from "./styles.module.css"

export default function Catalog() {
    const restaurants = useAppSelector(restaurantSelectors.selectAll);
    const {restaurantsLoaded, status} = useAppSelector(state => state.restaurant);
    const [reload, setReload] = useState(true)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!restaurantsLoaded || reload) {
            dispatch(fetchRestaurantsAsync())
            setReload(false)
        } 
    }, [restaurantsLoaded, reload, dispatch])

    if (status.includes("pending")) return <LoadingComponent message="Loading restaurants.."/>

    return (
        <div className={styles.container}>
            <CreateRestaurant setReload={setReload}/>
            <RestaurantList restaurants={restaurants} setReload={setReload} />
        </div>
    )
}