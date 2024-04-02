import { Grid } from "@mui/material"
import { Restaurant } from "../../types/restaurant"
import RestaurantCard from "../RestaurantCard"

interface Props {
    restaurants: Restaurant[]
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RestaurantList({ restaurants, setReload }: Props) {
  return (
    <Grid
      marginTop={3}
      wrap="wrap"
      container
      spacing={2}
      alignContent={"center"}
      justifyContent={"center"}
    >
      {restaurants.map((restaurant) => (
        <Grid item xs={3} sm={4} key={restaurant.id}>
          <RestaurantCard restaurant={restaurant} setReload={setReload} />
        </Grid>
      ))}
    </Grid>
  );
}