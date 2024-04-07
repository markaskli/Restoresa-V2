import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { addReservationDetailsAsync } from "../../stores/slices/basketSlice";
import { toast } from "react-toastify";
import ListProducts from "../../components/ListProducts";


export default function RestaurantMenu() {
    const [reload, setReload] = useState(false)
    const {reservationDetails} = useAppSelector(state => state.reservationDetails)
    const dispatch = useAppDispatch()

    const navigate = useNavigate();
    const { state } = useLocation();
    

    const setReservationDetails = useCallback(async () => {
        try {
            dispatch(addReservationDetailsAsync(reservationDetails!)) 
        }
        catch (error) {
            toast.error("An error occurred")
        }    
    }, [dispatch, reservationDetails])

    useEffect(() => {
        if (reservationDetails) {
            setReservationDetails()
        }  
        else {
            navigate(`/restaurants`)
        }  
    }, [dispatch, navigate, setReservationDetails])



    if (!state) return <h1>NO RESTAURANT WAS FOUND </h1>
    let restaurant = state.restaurant;

    if (!reservationDetails) return <h1>You have not chosen reservation details.</h1>

    return (
        <ListProducts restaurant={restaurant} setReload={setReload}/>
    )
}