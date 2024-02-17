import { Modal } from "@mui/base";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import styles from "./styles.module.css"

interface Props {
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangeEmailModal = ({openModal, setOpenModal}: Props) => {
    const handleClose = () => {
        setOpenModal(false);
        
    }
  
    return (
      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    );  
}

export default ChangeEmailModal