import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateReservationDTO, Reservation, ReservationDTO } from "../../types/reservation";
import requests from "../../API/requests";

export interface ReservationDetailsSlice {
    reservationDetails: ReservationDTO | null
    status: string
}

const initialState : ReservationDetailsSlice = {
    reservationDetails: null,
    status: 'idle'
}

export const submitReservationDetails = createAsyncThunk<Reservation, CreateReservationDTO>(
    'reservations/submitReservation',
    async (reservation, thunkAPI) => {
        try {
            return await requests.Reservation.createReservation(reservation)
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
        
    }
)

export const reservationDetailsSlice = createSlice({
    name: "reservationDetails",
    initialState,
    reducers: {
        setReservation: (state) => {
            state.reservationDetails = {
                reservedDate: "",
                reservedTime: "",
                seats: 0
            }
        },
        setPeopleCount: (state, action) => {
            if (state.reservationDetails == null) return         
            state.reservationDetails.seats = action.payload
        },
        setReservationTime: (state, action) => {
            if (state.reservationDetails == null) return   
            const {timeSlot, date} = action.payload
            state.reservationDetails.reservedDate = date
            state.reservationDetails.reservedTime = timeSlot
        }
    },
    extraReducers: (builder => {
        builder.addCase(submitReservationDetails.pending, (state) => {
            state.status = "pendingSubmitReservation"
        });
        builder.addCase(submitReservationDetails.fulfilled, (state) => {
            state.status = "idle"
        });
        builder.addCase(submitReservationDetails.rejected, (state) => {
            state.status = "idle"
        });
    })
})

export const {setPeopleCount, setReservationTime, setReservation} = reservationDetailsSlice.actions

export default reservationDetailsSlice.reducer