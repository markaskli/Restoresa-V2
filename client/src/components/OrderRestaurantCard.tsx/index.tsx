import { Box, Typography } from "@mui/material";
import { Restaurant } from "../../types/restaurant";
import { useAppSelector } from "../../stores/store";

interface Props {
    restaurant: Restaurant
}

export default function OrderRestaurantCard({ restaurant }: Props) {
    const {peopleServedCount, reservationDate,chosenTimeSlot} = useAppSelector(state => state.reservation)
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
                        {peopleServedCount}
                    </Typography>
                </Box>
                <Box>
                    <Typography color={"rgb(168, 163, 189)"} fontSize={"14px"}>
                        Date
                    </Typography>
                    <Typography>
                        {reservationDate}
                    </Typography>
                </Box>
                <Box>
                    <Typography color={"rgb(168, 163, 189)"} fontSize={"14px"}>
                        Time
                    </Typography>
                    <Typography>
                        {chosenTimeSlot}
                    </Typography>
                </Box>
            </Box>

        </Box>
    )
}