import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import { Restaurant } from "../../types/restaurant";
import { NavLink, useLocation } from "react-router-dom";
import DeleteRestaurantButton from "./DeleteRestaurantButton";
import styles from "./styles.module.css"

interface Props {
    restaurant: Restaurant
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RestaurantCard({ restaurant, setReload }: Props) {
  const location = useLocation();

  return (
    <Card
      component={NavLink}
      to={`${restaurant.id}`}
      sx={{ maxWidth: 500, textDecoration: "none" }}
    >
      <CardActionArea
        component="span"
        sx={{ boxShadow: "rgba(27, 27, 27, 0.2) 1px 1px 4px 0px" }}
      >
        <CardMedia
          component="img"
          height="140"
          image={restaurant.pictureUrl}
          alt={restaurant.name}
        />
        <CardContent className={styles.container}>
          <div>
            <Typography gutterBottom variant="h5" component="div">
              {restaurant.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {restaurant.description}
            </Typography>
          </div>
        </CardContent>
        {location.pathname.includes("personal-restaurants") ? (
          <CardActions>
            <DeleteRestaurantButton
              restaurantId={restaurant.id}
              setReload={setReload}
            />
          </CardActions>
        ) : null}
      </CardActionArea>
    </Card>
  );
}

