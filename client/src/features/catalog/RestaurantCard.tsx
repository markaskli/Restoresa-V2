import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import { Restaurant } from "../app/models/restaurant";

interface Props {
    restaurant: Restaurant
}

export default function RestaurantCard({restaurant} : Props) {
    return (
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea>
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

