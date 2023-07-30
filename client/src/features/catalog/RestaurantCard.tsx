import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Restaurant } from "../app/models/restaurant";
import { NavLink } from "react-router-dom";

interface Props {
    restaurant: Restaurant
}

export default function RestaurantCard({restaurant} : Props) {
    return (
        <Card component={NavLink} to={`${restaurant.restaurantId}`} sx={{ maxWidth: 400, textDecoration: "none" }} >
          <CardActionArea sx={{boxShadow: "rgba(27, 27, 27, 0.2) 1px 1px 4px 0px"}}>
            <CardMedia
              component="img"
              height="140"
              image={restaurant.pictureUrl}
              alt={restaurant.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {restaurant.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                    {restaurant.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
}

