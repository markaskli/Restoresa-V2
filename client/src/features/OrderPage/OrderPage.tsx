import { Box, Button, Typography } from "@mui/material";
import OrderRestaurantCard from "./OrderRestaurantCard";
import OrderProductCard from "./OrderProductCard";
import { useEffect } from "react";
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from "../app/store/store";
import { fetchBasketItemsAsync } from "./basketSlice";


export default function OrderPage() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBasketItemsAsync())
    }, [dispatch])


    

    if (status.includes("pendingFetchItems")) return <LoadingButton>Basket is loading...</LoadingButton>
    if (!basket) return <Typography display={"flex"} justifyContent={"center"} alignContent={"center"}>Your basket is empty</Typography>

    const totalPrice = basket.items.reduce((sum, currentItem) => sum += (currentItem.price * currentItem.quantity), 0) ?? 0;
    console.log(totalPrice);
    
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
                <OrderProductCard key={product.productId} product={product} restaurant={basket.restaurant}></OrderProductCard>
            )}
            <Box display={"flex"} flexDirection={"column"}>
                <Typography fontWeight={"600"} fontSize={"20px"}>
                    Total
                </Typography>
                <Typography fontWeight={"400"} fontSize={"20px"}>
                    {totalPrice} €
                </Typography>

            </Box>

            <Button variant="contained" color="secondary">Go to payment</Button>
        </Box>



    )
}