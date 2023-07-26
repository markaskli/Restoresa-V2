import { Grid } from "@mui/material"
import { Restaurant } from "../app/models/restaurant"
import RestaurantCard from "./RestaurantCard"

interface Props {
    restaurants: Restaurant[]
}

export default function RestaurantList({ restaurants }: Props) {
    return (
        <>
            <Grid marginTop={3} wrap="wrap" container spacing={2} alignContent={"center"} justifyContent={"center"}>

                {restaurants.map(restaurant =>
                    <Grid item xs={2.5} key={restaurant.restaurantId}>
                        <RestaurantCard restaurant={restaurant} />
                    </Grid>
                )}
            </Grid>
        </>

    )
}