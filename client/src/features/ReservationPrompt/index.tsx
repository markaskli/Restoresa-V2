import { useEffect, useState } from "react"
import 'react-calendar/dist/Calendar.css';
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import { fetchRestaurantAsync } from "../../stores/slices/menuSlice";
import { useAppSelector, useAppDispatch } from "../../stores/store";
import TimePrompt from "../../components/TimePrompt";
import SeatsPrompt from "../../components/SeatsPrompt";

export default function RestaurantPrompt() {
    const [step, setStep] = useState(1);
    const { restaurantId } = useParams();
    const { restaurant, status } = useAppSelector(state => state.menu);
    const [reload, setReload] = useState(false)
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchRestaurantAsync({restaurantId: parseInt(restaurantId!)}))
    }, [dispatch, reload, restaurantId]);

    if (status.includes("pending")) return <LoadingComponent message="Loading restaurant information.."/>
    if (restaurant === null) return <h1>Restaurant not found</h1>


    return (
        <>
            {step === 1 && <SeatsPrompt setState={setStep} restaurant={restaurant} />}
            {step === 2 && <TimePrompt setState={setStep} restaurant={restaurant}/>}
        </>

    )

}



