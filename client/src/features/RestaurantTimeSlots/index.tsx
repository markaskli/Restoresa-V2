import { Box, Typography } from "@mui/material"
import styles from "./styles.module.css"
import RestaurantInfoCard from "../../components/RestaurantInfoCard"
import CurrentTimeSlots from "../../components/SubmitTimeSlots"
import { Restaurant } from "../../types/restaurant"
import { useLocation } from "react-router-dom"



export default function RestaurantTimeSlots() {
    const { state } = useLocation();

    return (
        <Box className={styles.mainBox}>
            <RestaurantInfoCard restaurant={state.restaurant}/>
            <Typography className={styles.header}>Text</Typography>     
            <CurrentTimeSlots restaurant={state.restaurant} />
        </Box>
    )
}

