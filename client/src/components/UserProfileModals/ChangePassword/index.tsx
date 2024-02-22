import { Box, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import styles from "./styles.module.css"

const ChangePassword = () => {
  const {register, handleSubmit} = useForm()

  const submitForm = () => {
    console.log("nice")
  }
    return (
        <Box className={styles.modal}>
          <Typography id="modal-password-title" variant="h6" component="h2">
            Change your password
          </Typography>
          <form onSubmit={handleSubmit(submitForm)}>
            <label>Enter current password</label>
            <input {...register("oldPassword", {required: true})}></input>
            <label>Enter new password</label>
            <input {...register("newPassword", {required: true})}></input>
            <label>Enter new password</label>
            <input {...register("newPasswordRepeat", {required: true})}></input>
            <input type="submit"/>

          </form>
        </Box>
    )
}

export default ChangePassword