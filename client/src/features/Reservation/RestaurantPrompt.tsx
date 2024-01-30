import { Box, Button, MenuItem, MenuList, Typography } from "@mui/material"
import { useState } from "react"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import RestaurantMenu from "../RestaurantMenu"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface Props {
    setState:  React.Dispatch<React.SetStateAction<number>>
}


export default function RestaurantPrompt() {
    const [step, setStep] = useState(1);

    return (
        <>
            {step === 1 && <SeatsPrompt setState={setStep}/>}
            {step === 2 && <TimePrompt setState={setStep}/>}
        </>

    )

}



const SeatsPrompt = ({setState} : Props) => {
    const availableSeats = [1,2,3,4,5]
    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} justifyContent={"center"} textAlign={"center"} minHeight={"calc(100vh - 80px)"}>
            <Typography
                variant="h1"
                fontSize={"54px"}
                maxWidth={"20ch"}
                fontFamily={"Open Sans,sans-serif"}
                fontWeight={"bold"}
                color={"rgb(35, 33, 43)"}
            >
                How many of you are willing to be served?
            </Typography>
            <Box display={"flex"} gap={"20px"}>
                <select style={{width: "120px", border: "1px solid rgb(254, 206, 82)", height: "35px", fontSize: "16px", borderRadius: "10px", padding: "0 10px"}}>
                    {availableSeats.map(seat => 
                        <option key={seat} value={seat}>{seat}</option>
                        )}
                </select>
                <Button variant="outlined" onClick={() => setState(2)} sx={{borderRadius: "10px"}}>Continue</Button>
            </Box>
        </Box>
    )
}

const TimePrompt = ({setState} : Props) => {
    const [value, onChange] = useState<Value>(new Date());
    const date = new Date();
    const availableTimes = ["10:30", "11:00", "11:30", "12:00"];



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
                <Calendar minDate={date} onChange={onChange} value={value} />
            </Box>
            <Box display={"grid"} gridTemplateColumns={"repeat(4, 1fr)"} gap={"10px"}>
                {availableTimes.map(time => 
                    <Box key={time}> {time} </Box>)}
            </Box>
            <Box display={"flex"} gap={"20px"}>
                <Button variant="outlined" onClick={() => setState(1)}>BACK</Button>
                <Button variant="outlined">CONTINUE</Button>

            </Box>

        </Box>
    )
}