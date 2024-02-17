import { Box, Typography } from "@mui/material";
import { Restaurant } from "../../types/restaurant";
import { ReservationDTO } from "../../types/reservation";


interface Props {
    restaurant: Restaurant
    reservation: ReservationDTO
}

export default function OrderRestaurantCard({ restaurant, reservation }: Props) {
    
    return (
        <Box display={"flex"} flexDirection={"column"} sx={{ backgroundColor: "rgb(251, 246, 246)" }} gap={"15px"} padding={"10px"}>
            <Box display={"flex"}>
                <img style={{ height: "80px", width: "100px", borderRadius: "10px" }} src={restaurant.pictureUrl} />
                <Box display={"flex"} flexDirection={"column"} padding={"10px"}>
                    <Typography fontWeight={"600"} fontSize={"18px"}>
                        {restaurant.name}
                    </Typography>
                    <Typography fontWeight={"400"} fontSize={"14px"}>
                        {restaurant.address}
                    </Typography>
                </Box>
            </Box>
            <Box display={"flex"} gap={"15px"}>
                <Box>
                    <Typography color={"rgb(168, 163, 189)"} fontSize={"14px"}>
                        Seats
                    </Typography>
                    <Typography >
                        {reservation.seats}
                    </Typography>
                </Box>
                <Box>
                    <Typography color={"rgb(168, 163, 189)"} fontSize={"14px"}>
                        Date
                    </Typography>
                    <Typography>
                        {reservation.reservedDate}
                    </Typography>
                </Box>
                <Box>
                    <Typography color={"rgb(168, 163, 189)"} fontSize={"14px"}>
                        Time
                    </Typography>
                    <Typography>
                        {reservation.reservedTime}
                    </Typography>
                </Box>
            </Box>

        </Box>
    )
}