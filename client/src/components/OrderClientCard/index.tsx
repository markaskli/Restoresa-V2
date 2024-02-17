import { Box, Typography } from "@mui/material"
import { User } from "../../types/user"
import styles from "./styles.module.css"

interface Props {
    user: User
}

const OrderClientCard = ({user}: Props) => {
    return (
        <Box className={styles.boxOuter}>
            <Box>
                <Box>
                    <Typography className={styles.columnName}>Full Name</Typography>
                    <Typography className={styles.userInfo}>{user.name}{user.surname}</Typography>
                </Box>
                <Box>
                    <Typography className={styles.columnName}>E-mail</Typography>
                    <Typography className={styles.userInfo}>{user.email}</Typography>
                </Box>
            </Box>
            <Box>
                <Typography className={styles.columnName}>Phone Number</Typography>
                <Typography className={styles.userInfo}>{user.phoneNumber}</Typography>
            </Box>

        </Box>
    )
}

export default OrderClientCard