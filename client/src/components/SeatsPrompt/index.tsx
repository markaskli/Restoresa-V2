import { Box, Typography, Button } from "@mui/material"
import { Restaurant } from "../../types/restaurant"
import { useAppDispatch } from "../../stores/store"
import { setPeopleCount, setReservation } from "../../stores/slices/reservationDetailsSlice"
import { useEffect, useState } from "react"


interface Props {
    setState:  React.Dispatch<React.SetStateAction<number>>
    restaurant: Restaurant
}

const SeatsPrompt = ({ setState, restaurant }: Props) => {
  const [seatsCount, setSeatsCount] = useState(1);
  const availableSeats = Array.from(
    { length: restaurant.maxPeopleServedPerTable },
    (_, index) => index + 1
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setReservation());
  }, [dispatch]);

  const handeClick = () => {
    setState(2);
    dispatch(setPeopleCount(seatsCount));
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={"20px"}
      justifyContent={"center"}
      textAlign={"center"}
      minHeight={"calc(100vh - 80px)"}
    >
      <Typography
        variant="h1"
        fontSize={"54px"}
        maxWidth={"20ch"}
        fontFamily={"Open Sans,sans-serif"}
        fontWeight={"bold"}
        color={"rgb(35, 33, 43)"}
      >
        How many of you are willing to be served?
      </Typography>
      <Box display={"flex"} gap={"20px"}>
        <select
          style={{
            width: "120px",
            border: "1px solid rgb(254, 206, 82)",
            height: "35px",
            fontSize: "16px",
            borderRadius: "10px",
            padding: "0 10px",
          }}
          value={seatsCount}
          onChange={(e: any) => {
            setSeatsCount(e.target.value);
          }}
        >
          {availableSeats.map((seat) => (
            <option key={seat} value={seat}>
              {seat}
            </option>
          ))}
        </select>
        <Button
          variant="outlined"
          onClick={() => handeClick()}
          sx={{ borderRadius: "10px" }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default SeatsPrompt