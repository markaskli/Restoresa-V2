import { Box, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import styles from "./styles.module.css"

interface Props {
  currentPhoneNumber: string
}

const ChangePhoneNumber = ({currentPhoneNumber}: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => console.log("submitted");

  return (
    <Box className={styles.modal}>
      <Typography id="modal-phoneNumber-title" variant="h6" component="h2">
        Change your phone number
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Current phone number</label>
        <input 
        defaultValue={currentPhoneNumber ?? "No number is specified"}
        disabled={true}/>
        <label>Enter new phone number</label>
        <input {...register("newPhoneNumber", {required: true})}/>
        <input type="submit" />
      </form>
    </Box>
  );
};

export default ChangePhoneNumber