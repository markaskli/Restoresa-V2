import { Box, Typography } from "@mui/material"
import { Restaurant } from "../../types/restaurant"
import styles from "./styles.module.css"

interface Props {
    restaurant: Restaurant
}

const RestaurantInfoCard = ({restaurant}: Props) => {
  return (
    <Box className={styles.infoBox}>
      <Box className={styles.innerBox}>
        <Box>
          <Typography fontWeight={"600"} fontSize={"18px"}>
            {restaurant.name}
          </Typography>
          <Typography fontSize={"14px"}>{restaurant.address}</Typography>
        </Box>
        <Box>
          <Typography fontSize={"14px"}>{restaurant.description}</Typography>
        </Box>
      </Box>
      <Box className={styles.workDaysBox}>
        <Typography fontWeight={"600"} fontSize={"18px"}>
          Business Hours
        </Typography>
        {restaurant.workingHours.map((workday, index) => (
          <Box
            key={index}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            gap={"15px"}
          >
            <Typography key={workday.id}>{workday.weekDay}</Typography>
            <Typography key={index}>
              {workday.startTime} - {workday.finishTime}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box>
        <img
          className={styles.picture}
          src={restaurant.pictureUrl}
          alt="restaurant picture"
        ></img>
      </Box>
    </Box>
  );
};

export default RestaurantInfoCard