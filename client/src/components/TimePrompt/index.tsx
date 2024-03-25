import { Box, Typography, Button, MenuItem, ListItem } from "@mui/material";
import { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { TimeSlot } from "../../types/timeSlot";
import { Restaurant } from "../../types/restaurant";
import { useAppDispatch } from "../../stores/store";
import { setReservationTime } from "../../stores/slices/reservationDetailsSlice";
import styles from "./styles.module.css"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface Props {
    setState:  React.Dispatch<React.SetStateAction<number>>
    restaurant: Restaurant
}

const TimePrompt = ({setState, restaurant} : Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isContinueDisabled, setIsContinueDisabled] = useState(true)
    const [value, setValue] = useState<Value>(new Date())
    const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([])
    const [chosenTimeSlot, setChosenTimeSlot] = useState<TimeSlot>()
    const date = new Date();


    const handleNavigate = () => {
        dispatch(setReservationTime(
            {timeSlot: chosenTimeSlot,
             restaurantId: restaurant.id, 
             date: value!.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric"})}))
        navigate("menu", {state: {restaurant}})
    }

    const handleChange = (value: Value) => {
        setValue(value)
        let weekday = value!.toLocaleString("en-EN", { weekday: 'long' })
        let times = restaurant.workingHours
            .filter(wh => wh.weekDay.toLowerCase() === weekday.toLowerCase()).flatMap(wh => wh.timeSlots)
        if (times.length == 0) {
            setIsContinueDisabled(true)
        }
        
        setAvailableTimes(times)
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} justifyContent={"center"} textAlign={"center"} minHeight={"calc(100vh - 80px)"}>
            <Typography 
                variant="h1"
                fontFamily={"Open Sans, sans-serif"}
                maxWidth={"20ch"}
                fontSize={"54px"}
                fontWeight={"bold"}
                color={"rgb(35, 33, 43)"}
            >
                Which day and hour is suitable?
            </Typography>
            <Box>
                <Calendar minDate={date} onChange={handleChange}  />
            </Box>
            <Box display={"grid"} gridTemplateColumns={"repeat(4, 1fr)"} gap={"10px"}>
                { availableTimes.length > 0 ? (
                     availableTimes
                     .filter(timeSlot => timeSlot.available)
                     .map(time => 
                        <Button key={time.id}
                            className={styles.item}
                            onClick={(e: any) => (setChosenTimeSlot(e.target.innerText), setIsContinueDisabled(false))}
                        > {time.startTime}
                        </Button>)                  
                    ) : 
                
                    <Typography gridColumn={"1/5"}>No time slots available at the moment.</Typography>
                }
            </Box>
            <Box display={"flex"} gap={"20px"}>
                <Button variant="outlined" onClick={() => setState(1)}>BACK</Button>
                <Button variant="outlined" disabled={isContinueDisabled} onClick={() => handleNavigate()} >CONTINUE</Button>
                

            </Box>

        </Box>
    )
}

export default TimePrompt