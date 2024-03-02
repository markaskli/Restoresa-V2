import { Box, Typography } from "@mui/material"
import { Reservation } from "../../../types/reservation"
import styles from "./styles.module.css"

interface Props {
    reservation: Reservation
}

const ReservationRestaurantCard = ({reservation}: Props) => {
    return (
        <div className={styles.outerBox}>
            <div className={styles.headerBox}>
                <Typography>Order {reservation.id}</Typography>
                <div>
                    <Typography>{reservation.status}</Typography>
                    <Typography>{reservation.submitDate}</Typography>
                </div>
            </div>
            <div>
                <Typography>Restaurant information</Typography>
                <div className={styles.restaurantCard}>
                    <img src={reservation.restaurant.pictureUrl}></img>
                    <Typography>{reservation.restaurant.name}</Typography>
                </div>
            </div>
            
        </div>
    )
}

export default ReservationRestaurantCard