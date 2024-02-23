import { Box, Card, Typography } from "@mui/material"
import styles from "./styles.module.css"
import { Reservation } from "../../types/reservation"
import { Link, useNavigate } from "react-router-dom";

interface Props {
    reservation: Reservation
}

const OrdersHistoryCard = ({ reservation }: Props) => {
  const navigate = useNavigate()

    const getStatusColor = (value: string) => {
        var stringValue = value.toLowerCase();
        if (stringValue === "pending") {
            return "rgb(254, 206, 82)"
        }
        else if (stringValue === "succeeded") {
            return "green"
        }
        else if (stringValue === "failed") {
            return "red"
        }
        else {
            return null
        }
    }

    const handleClick = () => {
      navigate('reservation/:id')
    }

  return (
    <Card className={styles.outerBox} component={Link} to={`/reservation/${reservation.id}`}>
      <div className={styles.detailsBox}>
        <div>
          <Typography>RESERVATION NUMBER</Typography>
          <Typography>{"0cf9b2fc-3a59-41bd-bcf8-fb5676e8ea2e"}</Typography>
        </div>
        <div>
            <Typography>STATUS</Typography>
            <Typography color={`${getStatusColor(reservation.status)}`}>{reservation.status}</Typography>
        </div>
        <div>
            <div>DATE</div>
            <div className={styles.dateBox}>
                <Typography>{reservation.reservedDate}</Typography>
                <Typography>{reservation.reservedTime}</Typography>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default OrdersHistoryCard