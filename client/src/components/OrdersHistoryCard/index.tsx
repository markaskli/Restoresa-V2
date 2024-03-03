import { Box, Card, Typography } from "@mui/material"
import styles from "./styles.module.css"
import { Reservation } from "../../types/reservation"
import { Link, useNavigate } from "react-router-dom";
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
          <Typography>{"0cf9b2fc-3a59-41bd-bcf8-fb5676e8ea2e"}</Typography>
        </div>
        <div>
          <Typography>STATUS</Typography>
          <Typography color={`${getStatusColor(reservation.status)}`}>
            {reservation.status}
          </Typography>
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