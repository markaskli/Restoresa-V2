import { useEffect, useState } from "react"
import { Restaurant } from "../app/models/restaurant";
import RestaurantList from "./RestaurantList";

export default function Catalog() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/Restaurants")
        .then(response => response.json())
        .then(data => setRestaurants(data))
    }, [])

    return (
        <RestaurantList restaurants={restaurants} />
    )
}