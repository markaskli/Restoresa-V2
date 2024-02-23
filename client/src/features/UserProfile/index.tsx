import { Box, Typography } from "@mui/material";
import styles from "./styles.module.css"
import UserDetailsForm from "../../components/UserDetailsForm";
import OrdersHistoryCard from "../../components/OrdersHistoryCard";
import { Reservation } from "../../types/reservation";
import { User } from "../../types/user";

const usr: User = {
    id: "5020",
    username: "markz",
    name: "Markas",
    surname: "Kl",
    email: "markas@gmail.com",
    password: "yeye",
    phoneNumber: "864848485"
}

const res: Reservation = {
    id: 1,
    submitDate: "2024-02-17",
    reservedDate: "2024-02-19",
    reservedTime: "10:00",
    cost: 123,
    seats: 3,
    status: "PENDING",
    orderedProducts: [
        {
            
        }
    ],
    userId: "5020",
    restaurantId: 1

}

function UserProfile () {
    return (      
        <Box className={styles.outerBox}>
            <Typography className={styles.header}>Hello, {usr.username}</Typography>
            <Box className={styles.innerBox}>
                <Box>
                    <Typography textAlign={"left"}>User details</Typography>
                    <UserDetailsForm user={usr}/>
                </Box>  
                <Box>
                    <Typography textAlign={"right"}>Reservations history</Typography>
                    <OrdersHistoryCard reservation={res}/>
                </Box>        
      
            </Box>
            
        </Box>
    )
}

export default UserProfile