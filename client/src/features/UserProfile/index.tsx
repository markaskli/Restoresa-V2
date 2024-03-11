import { Box, Typography } from "@mui/material";
import styles from "./styles.module.css"
import UserDetailsForm from "../../components/UserDetailsForm";
import OrdersHistoryCard from "../../components/OrdersHistoryCard";
import { Reservation } from "../../types/reservation";
import { User } from "../../types/user";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { getReservationOfUser } from "../../stores/slices/reservationSlice";
import LoadingComponent from "../../components/LoadingComponent";

const usr: User = {
    id: "5020",
    username: "markz",
    name: "Markas",
    surname: "Kl",
    email: "markas@gmail.com",
    password: "yeye",
    phoneNumber: "864848485"
}


function UserProfile() {
  const { reservations, status } = useAppSelector(
    (store) => store.reservations
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!reservations) {
      dispatch(
        getReservationOfUser({ userId: "fb4b6ba3-f7b7-4322-aa9b-9eeabe3a295f" })
      );
    }
  }, [dispatch]);

  console.log(reservations)

  if (status.includes("pending"))
    return <LoadingComponent message="Loading reservations.." />;
    

  return (
    <Box className={styles.outerBox}>
      <Typography className={styles.header}>Hello, {usr.username}</Typography>
      <Box className={styles.innerBox}>
        <Box>
          <Typography textAlign={"left"}>User details</Typography>
          <UserDetailsForm user={usr} />
        </Box>
        <Box>
          <Typography textAlign={"right"}>Reservations history</Typography>
          {reservations ? (
            <div>
              {reservations?.map((res, index) => (
                <OrdersHistoryCard key={index} reservation={res} />
              ))}
            </div>
          ) : (
            <h1>Nėra</h1>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile