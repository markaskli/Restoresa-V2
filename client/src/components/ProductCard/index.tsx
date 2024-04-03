import { Typography, CardMedia, Box, Button } from "@mui/material";
import { Product } from "../../types/product";
import { useAppDispatch } from "../../stores/store";
import { addBasketItemAsync } from "../../stores/slices/basketSlice";
import DeleteProduct from "./DeleteProduct";

interface Props {
  product: Product
  setReload: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductCard({ product, setReload }: Props) {
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
        <Box display={"flex"} gap={"50px"}>
          <Button onClick={() => dispatch(addBasketItemAsync({productId: product.id, quantity: 1, restaurantId: product.restaurantId}))} sx={{borderRadius: "12px", backgroundColor: "rgb(254, 206, 82)", color: "rgb(35, 33, 43)"}}>{product.price / 100} €</Button>
          <DeleteProduct id={product.id} setReload={setReload}/>
        </Box>
        
      </Box>
      <CardMedia
        sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover", borderRadius: "10px", backgroundSize: "cover" }}
        image={product.imageUrl}
        title={product.title}
      />

    </Box>
  );
}