import { Container, Box, Typography, Button, Divider } from "@mui/material";
import { Product } from "../../types/product";
import { Restaurant } from "../../types/restaurant";
import ProductCard from "../ProductCard";

interface Props {
    restaurant: Restaurant
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const ListProducts = ({restaurant, setReload}: Props) => {
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

export default ListProducts