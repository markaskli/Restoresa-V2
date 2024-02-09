import { Box, Button, Typography } from "@mui/material";
import OrderRestaurantCard from "../../components/OrderRestaurantCard.tsx";
import OrderProductCard from "../../components/OrderProductCard";
import { useEffect } from "react";
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { fetchBasketItemsAsync } from "../../stores/slices/basketSlice";
import OrderClientCard from "../../components/OrderClientCard";

const user = {
    id: 1,
    username: "markaxs",
    name: "markas",
    surname: "klimovas",
    email: "markasklimovas@gmail.com",
    phoneNumber: "38064823259"
}



export default function OrderPage() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBasketItemsAsync())
    }, [dispatch])


    

    if (status.includes("pendingFetchItems")) return <LoadingButton>Basket is loading...</LoadingButton>
    if (basket === null) return <Typography display={"flex"} justifyContent={"center"} alignContent={"center"}>Your basket is empty</Typography>


    const totalPrice = basket.items.reduce((sum, currentItem) => sum += (currentItem.price * currentItem.quantity), 0) ?? 0;
    
    return (

        <Box display={"flex"} flexDirection={"column"} gap={"10px"} width={"min(80vw, 1200px)"} margin={"5% auto"}>
            <Box>
                <Typography fontSize={"32px"}> Order </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}  gap={"20px"}>
                <Box flex={"0.4 1 0%"}>
                    <Typography fontSize={"16px"} fontWeight={"500"}> Customer Information </Typography>
                    <OrderClientCard user={user}/>
                </Box>
                <Box flex={"0.6 1 0%"}>
                    <Typography fontSize={"16px"} fontWeight={"500"}> Restaurant Information </Typography>
                    <OrderRestaurantCard restaurant={basket.restaurant} />
                </Box>
            </Box>
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
                    {totalPrice.toPrecision(4)} €
                </Typography>

            </Box>

            <Button variant="contained" color="secondary">Go to payment</Button>
        </Box>



    )
}