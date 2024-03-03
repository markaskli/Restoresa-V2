import { Box, Button, Typography } from '@mui/material'
import { OrderedProduct } from '../../../types/orderedProduct'
import styles from "./styles.module.css"

interface Props {
    product: OrderedProduct
}

const ReservationItemCard = ({ product }: Props) => {
  return (
    <Box className={styles.outerBox}>
      <img className={styles.itemImg} src={product.imageUrl} />
      <Box display={"flex"} flexDirection={"column"}>
        <Typography fontWeight={"600"} fontSize={"16px"}>
          {product.title}
        </Typography>
      </Box>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <div className={styles.priceBox}>
          {product.price / 100} € x {product.quantity}
        </div>
      </Box>
    </Box>
  );
};

export default ReservationItemCard