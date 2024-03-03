import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css"
import ReservationItemCard from "./ReservationItemCard";
import { Reservation } from "../../types/reservation";
import ReservationRestaurantCard from "./ReservationRestaurantCard";



const IndividualReservationInfo = () => {
  const location = useLocation();
  const reservation: Reservation = location.state.data;
  if (reservation == undefined) {
    return <h1>NO DATA WAS FOUND</h1>;
  }

  return (
    <Box className={styles.outerBox}>
      <ReservationRestaurantCard reservation={reservation} />
      <Box>
        <Typography className={styles.heading}>Ordered food</Typography>
        <Box className={styles.itemBox}>
          {reservation.orderedProducts.map((op) => (
            <ReservationItemCard product={op} />
          ))}
        </Box>
      </Box>

      <Box className={styles.totalPriceBox}>
        <Typography fontWeight={600}>Total Price</Typography>
        <Typography fontWeight={700}>{reservation.cost} €</Typography>
      </Box>
    </Box>
  );
};

export default IndividualReservationInfo