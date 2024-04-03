import { Box, Typography } from "@mui/material";
import styles from "./styles.module.css"
import UserDetailsForm from "../../components/UserDetailsForm";
import OrdersHistoryCard from "../../components/OrdersHistoryCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { getReservationOfUser } from "../../stores/slices/reservationSlice";
import LoadingComponent from "../../components/LoadingComponent";


function UserProfile() {
  const { reservations, status } = useAppSelector(
    (store) => store.reservations
  );
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!reservations && user) {
      try {
        dispatch(getReservationOfUser({ userId: user.id }));
      }
      catch (error) {
        console.log(error)
      }
      
    }
  }, [dispatch, reservations, user]);


  if (status.includes("pending"))
    return <LoadingComponent message="Loading reservations.." />;

  if (!user) return <h1>User details were not found</h1>;

  return (
    <Box className={styles.outerBox}>
      <Typography className={styles.header}>Hello, {user.username}</Typography>
      <Box className={styles.innerBox}>
        <Box>
          <Typography textAlign={"left"} fontWeight={600}>User details</Typography>
          <UserDetailsForm user={user} />
        </Box>
        <Box>
          <Typography textAlign={"right"} fontWeight={600}>Reservations history</Typography>
          {reservations ? (
            <div>
              
              {reservations?.map((res, index) => (
                <OrdersHistoryCard key={index} reservation={res} />
              ))}
            </div>
          ) : (
            <div> The user has not made any reservations</div>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default UserProfile