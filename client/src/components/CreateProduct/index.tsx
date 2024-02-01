import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./styles.module.css"
import { useForm } from "react-hook-form";
import requests from "../../API/requests";

export type ProductFormValues = {
    type: string
    title: string
    description: string
    price: number
    imageUrl: string
    restaurantId: number
}

interface Props {
    id: number
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateProduct = ({id, setReload}: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {register, handleSubmit} = useForm<ProductFormValues>()

    const onSubmit = (data: ProductFormValues) => {
        const modifiedData = {
            ...data,
            restaurantId: id
        }
        //console.log(modifiedData)
        requests.Product.add(modifiedData)
        setReload(prev => !prev)
    }
  
    return (
      <div>
        <Button variant="contained" onClick={handleOpen}>Create product</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.box}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Product creation form
            </Typography>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Type" {...register("type", {required: "Please enter the type of the product."})}/>
                <input type="text" placeholder="Title" {...register("title", {required: "Please enter the type of the product."})}/>
                <input type="text" placeholder="Description" {...register("description", {required: "Please enter the description of the product.", maxLength: 200})}/>
                <input type="number" placeholder="Price" {...register("price", {required: "Please enter the price of the product.", min: 0})}/>
                <input type="text" placeholder="Image URL" {...register("imageUrl", {required: "Please enter the image URL of the product."})}/>
                <input type="submit" />
            </form>
          </Box>
        </Modal>
      </div>
    ); 
}

export default CreateProduct;