import { useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../types/product";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { fetchRestaurantAsync } from "../../stores/slices/restaurantSlice";
import LoadingComponent from "../../components/LoadingComponent";
import CreateProduct from "../../components/CreateProduct";

export default function RestaurantMenu() {
    let { restaurantId } = useParams();
    const { restaurant, status } = useAppSelector(state => state.menu);
    const [trigger, setTrigger] = useState(false)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchRestaurantAsync({restaurantId: parseInt(restaurantId!)}))
    }, [dispatch, trigger, restaurantId]);

    if (status.includes("pending")) return <LoadingComponent message="Loading products.."/>
    if (restaurant == null) return <h1>Restaurant not found</h1>

    const filteredProducts: Record<string, Product[]> = {};
    for (const product of restaurant.products) {
        const type = product.type;
        if (!filteredProducts[type]) {
            filteredProducts[type] = []
        }
        filteredProducts[type].push(product);
    }

    return (
        <Container>
            <Box marginTop={"50px"} marginBottom={"50px"} display={"flex"} justifyContent={"space-between"}>
                <div>
                    <Typography fontWeight={"700"} fontSize={"32px"}>
                        {restaurant?.name}
                    </Typography>
                    <Typography fontSize={"14px"} fontWeight={"400"}>
                        {restaurant?.description}
                    </Typography>
                </div>
                <CreateProduct id={restaurant.id}/>
            </Box>
            <Divider/>
            {Object.entries(filteredProducts).map(([type, items]) => (
                <Box key={type} paddingBottom={"50px"}>
                    <Typography color={"#23212b"} fontWeight={"700"} fontSize={"32px"} marginBottom={"15px"}>{type}</Typography>
                    <Box display={"grid"} gridTemplateColumns={"repeat(3, 1fr)"} gridTemplateRows={"repeat(auto-fit, 145px)"} gap={"30px"}>
                        {items.map(item => (
                            <ProductCard key={item.id} product={item} setTrigger={setTrigger} />
                        ))}
                    </Box>
                </Box>
            ))}
        </Container>


    )
}