import { useState } from "react";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../types/product";
import CreateProduct from "../../components/CreateProduct";
import styles from "./styles.module.css"

interface Props {
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RestaurantMenu() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [reload, setReload] = useState(false)
    let restaurant = state.restaurant;


    if (state.restaurant === null) return <h1>NO RESTAURANT WAS FOUND </h1>
    
    const filteredProducts: Record<string, Product[]> = {};
    for (const product of state.restaurant.products) {
        const type = product.type;
        if (!filteredProducts[type]) {
            filteredProducts[type] = []
        }
        filteredProducts[type].push(product);
    }




    const handleNavigate = () => {
        navigate("timeslots", {state: {restaurant}})
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
                <div className={styles.buttonBox}>
                    <Button className={styles.button} variant="contained" onClick={handleNavigate}> Time Slots</Button>
                    <CreateProduct id={restaurant.id} setReload={setReload}/>
                </div>
            </Box>
            <Divider/>
            {Object.entries(filteredProducts).map(([type, items]) => (
                <Box key={type} paddingBottom={"50px"}>
                    <Typography color={"#23212b"} fontWeight={"700"} fontSize={"32px"} marginBottom={"15px"}>{type}</Typography>
                    <Box display={"grid"} gridTemplateColumns={"repeat(3, 1fr)"} gridTemplateRows={"repeat(auto-fit, 145px)"} gap={"30px"}>
                        {items.map(item => (
                            <ProductCard key={item.id} product={item} setReload={setReload} />
                        ))}
                    </Box>
                </Box>
            ))}
        </Container>


    )
}