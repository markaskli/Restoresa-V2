import { Box, Button, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { BasketItem } from "../../types/basket";
import { useAppDispatch } from "../../stores/store";
import { LoadingButton } from "@mui/lab";
import { addBasketItemAsync, removeBasketItemAsync } from "../../stores/slices/basketSlice";
import { Restaurant } from "../../types/restaurant";

interface Props {
    product: BasketItem
    restaurant: Restaurant
}

export default function OrderProductCard({ product, restaurant }: Props) {
    const dispatch = useAppDispatch();

    return (
        <Box display={"grid"} gridTemplateColumns={"1fr 3fr 1fr"} borderRadius={"10px"} sx={{ backgroundColor: "rgb(251, 246, 246)" }} alignItems={"center"} padding={"10px"} gap={"5px"}>
            <img style={{ height: "80px", width: "100px", borderRadius: "10px" }} src={product.imageUrl} />
            <Box display={"flex"} flexDirection={"column"}>
                <Typography fontWeight={"600"} fontSize={"16px"}>{product.title}</Typography>
                <Typography fontSize={"14px"}>{product.description}</Typography>
                <Button disabled={true} sx={{ borderRadius: "12px", backgroundColor: "rgb(254, 206, 82)", "&.Mui-disabled": { color: "rgb(35, 33, 43)" }, minWidth: "50px", maxWidth: "80px", maxHeight: "30px"}}>{product.price / 100} €</Button>
            </Box>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <LoadingButton
                onClick={() => dispatch(removeBasketItemAsync({productId: product.productId, quantity: 1, name: "remove"}))}
                >
                    <Remove/>
                </LoadingButton>
                
                <div style={{
                    border: "1px solid rgb(220, 210, 210)",
                    color: "rgb(35, 33, 43)",
                    fontSize: "14px", fontWeight: "500",
                    width: "30px", height: "30px",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    borderRadius: "10px"
                }}>
                    {product.quantity}
                </div>
                <LoadingButton
                onClick={() => dispatch(addBasketItemAsync({productId: product.productId, quantity: 1, restaurantId: restaurant.id}))}
                >
                    <Add />
                </LoadingButton>
                
            </Box>


        </Box>
    )
}