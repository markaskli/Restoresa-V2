import { useEffect } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Product } from "../app/models/product";
import { useAppDispatch, useAppSelector } from "../app/store/store";
import { productSelectors, fetchProductsAsync } from "./menuSlice";
import { fetchRestaurantAsync } from "../catalog/restaurantSlice";
import LoadingComponent from "../app/layout/LoadingComponent";

export default function RestaurantMenu() {
    let { restaurantId } = useParams();
    const restaurant = useAppSelector(state => state.restaurant)
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.menu)

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProductsAsync({restaurantId: parseInt(restaurantId!)}));
        dispatch(fetchRestaurantAsync({restaurantId: parseInt(restaurantId!)}))
    }, [productsLoaded, dispatch, restaurantId]);

    if (status.includes("pending")) return <LoadingComponent message="Loading products.."/>


    const filteredProducts: Record<string, Product[]> = {};

    for (const product of products) {
        const type = product.type;
        if (!filteredProducts[type]) {
            filteredProducts[type] = []
        }
        filteredProducts[type].push(product);
    }


    return (
        <Container>
            <Box marginTop={"50px"} marginBottom={"50px"}>
                <Typography fontWeight={"700"} fontSize={"32px"}>
                    {restaurant.entities[parseInt(restaurantId!)]?.name}
                </Typography>
                <Typography fontSize={"14px"} fontWeight={"400"}>
                    {restaurant.entities[parseInt(restaurantId!)]?.description}
                </Typography>
            </Box>
            <Divider/>
            {Object.entries(filteredProducts).map(([type, items]) => (
                <Box key={type} paddingBottom={"50px"}>
                    <Typography color={"#23212b"} fontWeight={"700"} fontSize={"32px"} marginBottom={"15px"}>{type}</Typography>
                    <Box display={"grid"} gridTemplateColumns={"repeat(3, 1fr)"} gridTemplateRows={"repeat(auto-fit, 145px)"} gap={"30px"}>
                        {items.map(item => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </Box>
                </Box>
            ))}
        </Container>


    )
}