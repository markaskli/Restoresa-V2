import { Box, Button, TextField, Typography } from "@mui/material"
import { User } from "../../types/user"
import styles from "./styles.module.css"
import { useState } from "react"
import ChangeEmailModal from "../UserProfileModals/ChangeEmail"

interface Props {
    user: User
}

const UserDetailsForm = ({user}: Props) => {
    const [emailModal, setEmailModel] = useState(false)

    const handleEmailModal = () => {
        setEmailModel(true)
    }

    return (
        <Box className={styles.outerBox}> 
            <div>
                <Typography>Username</Typography>
                <TextField variant="standard" value={user.username} disabled></TextField>
            </div>
            <div className={styles.individualBox}>
                <Typography>Full Name</Typography>
                <TextField variant="standard" inputProps={{readOnly: true}} value={"Markas Klimovas"}></TextField>
                <Button variant="text"  onClick={() => console.log("user changed full name")}>Change full name</Button>
            </div>  
            <div className={styles.individualBox}>
                <Typography>Password</Typography>
                <TextField variant="standard" inputProps={{readOnly: true}} value={user.password} type="password"></TextField>
                <Button variant="text" onClick={() => console.log("user changed password")}>Change password</Button>
            </div>      
            <div className={styles.individualBox}>
                <Typography>Email</Typography>
                <TextField variant="standard" inputProps={{readOnly: true}} value={user.email}></TextField>
                <Button variant="text" onClick={handleEmailModal}>Change email</Button>
                <div>
                    <ChangeEmailModal openModal={emailModal} setOpenModal={setEmailModel}/>
                </div>
                
            </div>      
            <div className={styles.individualBox}>
                <Typography>Phone Number</Typography>
                <TextField variant="standard" inputProps={{readOnly: true}} value={user.phoneNumber}></TextField>
                <Button variant="text" onClick={() => console.log("user changed phonumber")}>Change phone number</Button>
            </div>        
        </Box>
    )
}

export default UserDetailsForm