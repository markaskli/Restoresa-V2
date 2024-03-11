import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import requests from "../../API/requests"
import { Reservation } from "../../types/reservation"

export interface ReservationsSlice  {
    reservations: Reservation[] | null
    status: string
}

const initialState : ReservationsSlice = {
    reservations: null,
    status: "idle"
}

export const getReservationOfUser = createAsyncThunk<Reservation[], {userId: string}>(
    'reservations/getReservationsOfUser',
    async ({userId}, thunkAPI) => {
        try {
            return await requests.Reservation.getReservations(userId)
        }
        catch (error: any) {
            thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const reservationSlice = createSlice({
    name: "reservationDetails",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder => {
        builder.addCase(getReservationOfUser.pending, (state) => {
            state.status = "pendingGetReservationsOfUser"
        });
        builder.addCase(getReservationOfUser.rejected, (state) => {
            state.status = "idle"
        });
        builder.addCase(getReservationOfUser.fulfilled, (state, action) => {
            state.reservations = action.payload
            state.status = "idle"
        });
    })
})

export default reservationSlice.reducer