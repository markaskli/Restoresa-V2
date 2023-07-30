import { Box, Button, Typography } from "@mui/material";
import OrderRestaurantCard from "./OrderRestaurantCard";
import { Basket } from "../app/models/basket";
import OrderProductCard from "./OrderProductCard";
import { useEffect, useState } from "react";
import { getCookie } from "../app/util/util";



export default function OrderPage() {
    const [basket, setBasket] = useState<Basket>();

    useEffect(() => {
        const buyerId = getCookie("buyerId")
        console.log(buyerId);
        if (buyerId) {
            fetch("http://localhost:5000/api/Basket", {
                method: "GET",
                credentials: "include"
            })
                .then(response => response.json())
                .then(data => setBasket(data))
                .catch(error => console.log(error))
        }
    }, [])

    if (!basket) return <Typography>Your basket is empty</Typography>

    return (

        <Box display={"flex"} flexDirection={"column"} gap={"10px"} width={"min(80vw, 1200px)"} margin={"5% auto"}>
            <Typography fontSize={"32px"}>
                Order
            </Typography>
            <Typography fontSize={"16px"} fontWeight={"500"}>
                Restaurant information
            </Typography>
            <OrderRestaurantCard restaurant={basket?.restaurant} />
            <Typography fontSize={"16px"}>
                Food information
            </Typography>
            {basket.items.map(product =>
                <OrderProductCard key={product.productId} product={product}></OrderProductCard>
            )}
            <Box display={"flex"} flexDirection={"column"}>
                <Typography fontWeight={"600"} fontSize={"20px"}>
                    Total
                </Typography>
                <Typography fontWeight={"400"} fontSize={"20px"}>
                    {11.79} €
                </Typography>

            </Box>

            <Button variant="contained" color="secondary">Go to payment</Button>
        </Box>



    )
}