import { Box, Typography } from "@mui/material"
import { Restaurant } from "../../types/restaurant"
import styles from "./styles.module.css"

interface Props {
    restaurant: Restaurant
}

const restaurant  = {
    id: 1,
    name: "Skanus kebabai",
    address: "Medžiotojų g. 18",
    pictureUrl: "https://www.collinsdictionary.com/images/full/restaurant_135621509.jpg",
    description: "Patys skaniausi kebabai!",
    workingHours: [
    {
        id: 1,
        weekDay: "Monday",
        workingHoursStart: "9:00",
        workingHoursFinish: "17:00",

    },
    {
        id: 2,
        weekDay: "Tuesday",
        workingHoursStart: "9:00",
        workingHoursFinish: "17:00",
    },
    {
        id: 3,
        weekDay: "Wednesday",
        workingHoursStart: "9:00",
        workingHoursFinish: "17:00",

    },
    {
        id: 4,
        weekDay: "Thursday",
        workingHoursStart: "9:00",
        workingHoursFinish: "17:00",

    },
    {
        id: 5,
        weekDay: "Friday",
        workingHoursStart: "9:00",
        workingHoursFinish: "22:00",

    },
    {
        id: 6,
        weekDay: "Saturday",
        workingHoursStart: "10:00",
        workingHoursFinish: "18:00",

    },
    {
        id: 7,
        weekDay: "Sundary",
        workingHoursStart: "10:00",
        workingHoursFinish: "13:00",

    }]
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