import { createSlice } from "@reduxjs/toolkit";

export interface ReservationSlice {
    peopleServedCount: number,
    reservationDate: string,
    chosenTimeSlot: string
}

const initialState : ReservationSlice = {
    peopleServedCount: 0,
    reservationDate: "",
    chosenTimeSlot: ""
}

export const reservationSlice = createSlice({
    name: "reservationDetails",
    initialState,
    reducers: {
        setPeopleCount: (state, action) => {
            state.peopleServedCount = action.payload
        },
        setReservationTime: (state, action) => {
            const {timeSlot, date} = action.payload
            console.log(timeSlot, date)
            state.reservationDate = date
            state.chosenTimeSlot = timeSlot
        }
    }
})

export const {setPeopleCount, setReservationTime} = reservationSlice.actions

export default reservationSlice.reducer