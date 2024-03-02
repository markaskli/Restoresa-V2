import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css"
import ReservationItemCard from "./ReservationItemCard";
import { Reservation } from "../../types/reservation";
import ReservationRestaurantCard from "./ReservationRestaurantCard";



const IndividualReservationInfo = () => {
    const location = useLocation();
    const reservation: Reservation = location.state.data
    if (reservation == undefined) {
        return <h1>NO DATA WAS FOUND</h1>
    }

    return (
       <Box className={styles.outerBox}>
            <ReservationRestaurantCard reservation={reservation}/>
            {reservation.orderedProducts.map(op =>
                <ReservationItemCard product={op} />
            )}
            
       </Box>
    )

}

export default IndividualReservationInfo