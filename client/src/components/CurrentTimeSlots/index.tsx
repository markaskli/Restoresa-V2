import { Box, Typography, MenuItem, FormControl, ListItem, TextField, Grid, Button } from "@mui/material";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, useForm } from "react-hook-form";
import styles from "./styles.module.css"
import dayjs from "dayjs";
import { Restaurant } from "../../types/restaurant";
import { useEffect, useState } from "react";
import requests from "../../API/requests";
import { TimeSlot } from "../../types/timeSlot";

interface Props {
  restaurant: Restaurant
}

interface IFormInput {
  weekDay: string,
  startTime: string,
  finishTime: string
}

export type TimeSlotDTO = {
  startTime: string,
  endTime: string
}



const CurrentTimeSlots = ({restaurant}: Props) => {
  const { handleSubmit, control } = useForm<IFormInput>();
  const [currentTimeSlots, setCurrentTimeSlots] = useState<TimeSlot[]>([])

  const handleClick = async (e: any) => {
    const selectedDay = e.target.value;
    if (selectedDay !== "") {
      var slots = await requests.RestaurantRequests.getTimeSlots(restaurant.id, e.target.value)
      setCurrentTimeSlots(slots)
    }
  }

  const handleFormSubmit = async (data: IFormInput) => {
    const response = await requests.RestaurantRequests.addTimeSlots(restaurant.id, data.weekDay, {startTime: data.startTime, endTime: data.finishTime})
    console.log(response)
  }

  return (
    <form onSubmit={handleSubmit((data) => handleFormSubmit(data))}>
      <Box>
        <Box className={styles.mainBox}>
          <Box className={styles.dayBox}>
            <Typography className={styles.header}>
              Choose the day of the week
            </Typography>
            <Controller
              name="weekDay"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  select
                  variant={"outlined"}
                  style={{ width: "100%" }}
                  label="Week day"
                  value={value ?? ""}
                  defaultValue={""}
                  onChange={(e) => {
                    onChange(e)
                    //console.log(e.target.value)
                    handleClick(e)
                  }}
                >
                  {restaurant.workingHours.map((workday, index) => (
                    <MenuItem 
                      key={index} 
                      value={workday.weekDay}
                      
                    >
                      {workday.weekDay}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Box>
            <Typography className={styles.header}>
              Current time slots of the day
            </Typography>
            <Grid container spacing={1} columns={3}>
              {currentTimeSlots.length === 0 ? (
                <Grid item xs={8}>
                  <ListItem key={2}>There are no slots.</ListItem>
                </Grid>
              ) : (
                currentTimeSlots.map((slot, index) => (
                  <Grid item xs={1} key={index}>
                    <Typography >
                      {slot.startTime} - {slot.endTime}
                    </Typography>
                  </Grid>  
                ))
              )}
            </Grid>
          </Box>
          <Box className={styles.timeBox}>
            <Typography className={styles.header}>
              Choose time for the slot
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name="startTime"
                render={({ field: { onChange, value } }) => (
                  <TimePicker
                    label="Start time"
                    ampm={false}
                    format="HH:mm"
                    value={value ?? ""}
                    onChange={(data) => onChange(dayjs(data).format("HH:mm"))}
                  />
                )}
              />

              <Controller
                control={control}
                name="finishTime"
                render={({ field: { onChange, value } }) => (
                  <TimePicker
                    label="Finish time"
                    ampm={false}
                    format="HH:mm"
                    value={value ?? ""}
                    onChange={(data) => onChange(dayjs(data).format("HH:mm"))}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default CurrentTimeSlots;
