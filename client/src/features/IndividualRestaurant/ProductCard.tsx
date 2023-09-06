import { Typography, CardMedia, Box, Button } from "@mui/material";
import { Product } from "../app/models/product";
import { useAppDispatch } from "../app/store/store";
import { addBasketItemAsync } from "../OrderPage/basketSlice";

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();


  
  return (
    <Box display={"grid"} gridTemplateColumns={"1.5fr 1fr"} gap={"10px"} padding={"10px"} boxShadow={"rgba(27, 27, 27, 0.2) 1px 1px 4px 0px;"} minHeight={"115px"} >
      <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"flex-start"}>
        <Box sx={{"padding": 0}} >
          <Typography color={"rgb(35, 33, 43)"} fontWeight={"600"} fontSize={"16px"}>{product.title}</Typography>
        </Box>
        <Box sx={{"padding": 0}} >
          <Typography color={"rgb(78, 74, 90)"} fontWeight={"400"} fontSize={"12px"}>{product.description}</Typography>
        </Box>
        <Button onClick={() => dispatch(addBasketItemAsync({productId: product.id, quantity: 1, restaurantId: product.restaurantId}))} sx={{borderRadius: "12px", backgroundColor: "rgb(254, 206, 82)", color: "rgb(35, 33, 43)"}}>{product.price} €</Button>
      </Box>
      <CardMedia
        sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: "10px", backgroundSize: "cover" }}
        image={product.imageUrl}
        title={product.title}
      />

    </Box>
  );
}