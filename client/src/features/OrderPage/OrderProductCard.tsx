import { Box, Button, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { BasketItem } from "../app/models/basket";

interface Props {
    product: BasketItem
}

export default function OrderProductCard({ product }: Props) {
    return (
        <Box display={"grid"} gridTemplateColumns={"1fr 3fr 1fr"} borderRadius={"10px"} sx={{ backgroundColor: "rgb(251, 246, 246)" }} alignItems={"center"} padding={"10px"} gap={"5px"}>
            <img style={{ height: "80px", width: "100px", borderRadius: "10px" }} src={product.imageUrl} />
            <Box display={"flex"} flexDirection={"column"}>
                <Typography fontWeight={"600"} fontSize={"16px"}>{product.title}</Typography>
                <Typography fontSize={"14px"}>{product.description}</Typography>
                <Button disabled={true} sx={{ borderRadius: "12px", backgroundColor: "rgb(254, 206, 82)", "&.Mui-disabled": { color: "rgb(35, 33, 43)" }, minWidth: "50px", maxWidth: "80px" }}>{product.price} €</Button>
            </Box>
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Remove />
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

                <Add />
            </Box>


        </Box>
    )
}