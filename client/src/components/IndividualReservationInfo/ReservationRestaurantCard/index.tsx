import { Box, Typography } from "@mui/material"
import { Reservation } from "../../../types/reservation"
import styles from "./styles.module.css"
import { getStatusColor } from "../../../utils/util"

interface Props {
    reservation: Reservation
}

const ReservationRestaurantCard = ({ reservation }: Props) => {
  return (
    <div className={styles.outerBox}>
      <div className={styles.headerBox}>
        <Typography fontSize={"32px"} fontWeight={"600"}>
          Order
          <span style={{ marginLeft: "10px", color: "rgb(254, 206, 82)" }}>
            {reservation.id}
          </span>
        </Typography>
        <div style={{ textAlign: "center" }}>
          <Typography
            color={`${getStatusColor(reservation.status)}`}
            fontSize={"14px"}
          >
            {reservation.status}
          </Typography>
          <Typography
            color={"rgb(168, 163, 189)"}
            fontSize={"14px"}
            fontWeight={"400"}
          >
            {reservation.submitDate}
          </Typography>
        </div>
      </div>
      <div>
        <Typography>Restaurant information</Typography>
        <div className={styles.restaurantCard}>
          <div className={styles.restaurantCardUpperBox}>
            <img src={reservation.restaurant.pictureUrl}></img>
            <div>
              <Typography>
                {reservation.restaurant.name} {reservation.restaurant.address}
              </Typography>
              <Typography>{reservation.restaurant.description}</Typography>
            </div>
          </div>
          <div className={styles.restaurantCardLowerBox}>
            <div>
              <Typography>Seats</Typography>
              <Typography>{reservation.seats}</Typography>
            </div>
            <div>
              <Typography>Date</Typography>
              <Typography>{reservation.reservedDate}</Typography>
            </div>
            <div>
              <Typography>Time</Typography>
              <Typography>{reservation.reservedTime}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationRestaurantCard