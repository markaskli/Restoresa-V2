import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form"
import styles from "./styles.module.css"
import requests from "../../API/requests";

export type FormValues = {
    name: string
    address: string
    pictureUrl: string
    description: string
}

interface Props {
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateRestaurant = ({setReload} : Props) =>
{
    const {register, handleSubmit} = useForm<FormValues>();
    const onSubmit = (data: FormValues) => {
        //console.log(data)
        requests.RestaurantRequests.add(data)
        setReload(true)
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Add restaurant</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"  
            >
                <Box className={styles.box}>
                    <Typography id="modal-modal-title">
                        Text in a modal
                    </Typography>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <label>Name</label>
                        <input {...register("name", {required: true})}/>
                        <label>Address</label>
                        <input {...register("address", {required: true})}/>
                        <label>Picture Url</label>
                        <input {...register("pictureUrl", {required: true})}/>
                        <label>Description</label>
                        <input {...register("description", {required: true, maxLength: 200})}/>
                        <input type="submit"/>
                    </form>
                </Box>
            </Modal>
        </div>

    )
}

export default CreateRestaurant