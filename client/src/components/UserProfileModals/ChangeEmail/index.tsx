import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./styles.module.css"
import { useForm } from "react-hook-form";

interface Props {
  currentEmail: string 
}

const ChangeEmail = ({currentEmail}: Props) => {
  const {register, handleSubmit} = useForm()

    const onSubmit = () => console.log("changed email")

    return (
      <Box className={styles.modal}>
        <Typography id="modal-email-title" variant="h6" component="h2">
          Change your e-mail address
        </Typography>
        <Box className={styles.formBox}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Current Email address</label>
            <input defaultValue={currentEmail}
            disabled
            />
            <label>Enter New Email</label>
            <input {...register("submittedEmail", { required: true})} />
            <input type="submit" />
          </form>
        </Box>

      </Box>
    );  
}

export default ChangeEmail