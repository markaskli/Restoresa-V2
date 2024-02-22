import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { User } from "../../types/user"
import styles from "./styles.module.css"
import { useReducer, useState } from "react"
import ChangeEmail from "../UserProfileModals/ChangeEmail"
import ChangePhoneNumber from "../UserProfileModals/ChangePhoneNumber"
import ChangePassword from "../UserProfileModals/ChangePassword"

interface Props {
    user: User
}

const initialState = {
  passwordModal: false,
  emailModal: false,
  phoneNumberModal: false
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'open_password': {
      return {
        ...state,
        passwordModal: true
      }
    }
    case 'close_password': {
      return {
        ...state,
        passwordModal: false
      }
    }
    case 'open_email': {
      return {
        ...state,
        emailModal: true
      }
    }
    case 'close_email': {
      return {
        ...state,
        emailModal: false
      }
    }
    case 'open_phoneNumber': {
      return {
        ...state,
        phoneNumberModal: true
      }
    }
    case 'close_phoneNumber': {
      return {
        ...state,
        phoneNumberModal: false
      }
    }
  }
}

const UserDetailsForm = ({user}: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    return (
      <Box className={styles.outerBox}>
        <div className={styles.individualBox}>
          <Typography>Full Name</Typography>
          <TextField
            variant="standard"
            disabled
            value={"Markas Klimovas"}
          ></TextField>
        </div>
        <div className={styles.individualBox}>
          <Typography>Password</Typography>
          <TextField
            variant="standard"
            inputProps={{ readOnly: true }}
            value={user.password}
            type="password"
          ></TextField>
          <div className={styles.individualBox}>
            <Button onClick={() => dispatch({type: "open_password"})}>Change password</Button>
            <Modal
              open={state.passwordModal}
              onClose={() => dispatch({type: "close_password"})}
              aria-labelledby="modal-password-title"
              aria-describedby="modal-password-description"
            >
              <ChangePassword />
            </Modal>
          </div>
        </div>
        <div>
          <Typography>Email</Typography>
          <TextField
            variant="standard"
            inputProps={{ readOnly: true }}
            value={user.email}
          ></TextField>
          <div className={styles.individualBox}>
            <Button onClick={() => dispatch({type: "open_email"})}>Change e-mail</Button>
            <Modal
              open={state.emailModal}
              onClose={() => dispatch({type: "close_email"})}
              aria-labelledby="modal-email-title"
              aria-describedby="modal-email-description"
            >
              <ChangeEmail currentEmail={user.email}/>
            </Modal>
          </div>
        </div>
        <div className={styles.individualBox}>
          <Typography>Phone Number</Typography>
          <TextField
            variant="standard"
            inputProps={{ readOnly: true }}
            value={user.phoneNumber}
          ></TextField>
          <div className={styles.individualBox}>
            <Button onClick={() => dispatch({type: "open_phoneNumber"})}>Change phone number</Button>
            <Modal
              open={state.phoneNumberModal}
              onClose={() => dispatch({type: "close_phoneNumber"})}
              aria-labelledby="modal-phoneNumber-title"
              aria-describedby="modal-phoneNumber-description"
            >
              <ChangePhoneNumber currentPhoneNumber={user.phoneNumber} />
            </Modal>
          </div>
        </div>
      </Box>
    );
}

export default UserDetailsForm