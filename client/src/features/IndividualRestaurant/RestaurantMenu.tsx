import { useEffect, useState } from "react";
import { Restaurant } from "../app/models/restaurant";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Product } from "../app/models/product";

export default function RestaurantMenu() {
    let { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState<Restaurant>();

    useEffect(() => {
        fetch(`http://localhost:5000/api/Restaurants/${restaurantId}`)
            .then(response => response.json())
            .then(data => setRestaurant(data))
    }, [restaurantId]);


    if (!restaurant) return <h1>Restaurant not found!</h1>


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
            <Box marginTop={"50px"} marginBottom={"50px"}>
                <Typography fontWeight={"700"} fontSize={"32px"}>
                    {restaurant?.name}
                </Typography>
                <Typography fontSize={"14px"} fontWeight={"400"}>
                    {restaurant?.address}
                </Typography>
            </Box>
            <CssBaseline />
            {Object.entries(filteredProducts).map(([type, items]) => (
                <Box marginBottom={"50px"}>
                    <Typography color={"#23212b"} fontWeight={"700"} fontSize={"32px"} marginBottom={"15px"}>{type}</Typography>
                    <Box marginBottom={"10px"} display={"grid"} gridTemplateColumns={"repeat(3, 1fr)"} gridTemplateRows={"repeat(auto-fit, 150px)"} gap={"30px"}>
                        {items.map(item => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </Box>
                </Box>
            ))}
        </Container>


    )
}