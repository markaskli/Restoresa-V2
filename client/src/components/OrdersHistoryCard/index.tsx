import { Card, Typography } from "@mui/material"
import styles from "./styles.module.css"
import { Reservation } from "../../types/reservation"
import { Link } from "react-router-dom";
import { getStatusColor } from "../../utils/util";

interface Props {
    reservation: Reservation
}

const OrdersHistoryCard = ({ reservation }: Props) => {
  return (
    <Card
      component={Link}
      to={`/reservation/${reservation.id}`}
      className={styles.linkComp}
      state={{ data: reservation }}
    >
      <div className={styles.outerBox}>
        <div>
          <Typography>RESERVATION NUMBER</Typography>
          <Typography>{reservation.id}</Typography>
        </div>
        <div>
          <Typography>STATUS</Typography>
          <Typography color={`${getStatusColor(reservation.paymentStatus)}`}>
            {reservation.paymentStatus}
          </Typography>
        </div>
        <div>
          <div>DATE</div>
          <div className={styles.dateBox}>
            <Typography>{reservation.reservedDate}</Typography>
            <Typography>{reservation.reservedTime.slice(0, 5)}</Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrdersHistoryCard