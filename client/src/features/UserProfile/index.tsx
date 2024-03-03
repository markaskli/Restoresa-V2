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
            id: 1,
            price: 50,
            quantity: 3,
            title: "Kebabai lėkštėje",
            imageUrl: "https://imageproxy.wolt.com/menu/menu-images/612f4d7b49e5b35aec3fa5ca/0eb54036-6c29-11ed-ba72-027b32e4a87d_beef.jpeg?w=600"
            
        },
        
    ],
    userId: "5020",
    restaurant: {
        id: 1,
        name: "Big Kebi",
        address: "JONAVOJE",
        pictureUrl: "https://imageproxy.wolt.com/venue/5a8292e92e3b00000b6f5a07/23c991a6-54b8-11ea-b860-0a5864790c11_nuotr.Egles_Gendrenaites_www.egphoto.lt_2020_02-1.jpg",
        description: "string",
        maxPeopleServedPerTable: 1,
        products: [
            
        ]

    }

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