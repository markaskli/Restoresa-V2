import {CardNumberElement, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import { Button, Typography } from '@mui/material';
import LoadingComponent from '../LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../stores/store';
import { submitReservationDetails } from '../../stores/slices/reservationDetailsSlice';
import { clearBasket } from '../../stores/slices/basketSlice';


const user = {
  id: "2e953596-14d0-4205-864d-bf7e46347456",
  username: "markaxs",
  name: "markas",
  password: "asd",
  surname: "klimovas",
  email: "markasklimovas@gmail.com",
  phoneNumber: "38064823259"
}

const CheckoutForm = () => {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const {basket} = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch()

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements || !basket) {
      return;
    }

    setIsLoading(true)
    dispatch(
      submitReservationDetails({
        reservedDate: basket.reservedDate,
        reservedTime: basket.reservedTime,
        seats: basket.seats,
        userId: user.id,
        restaurantId: basket.restaurant.id,
      })
    ); // to change user id

    const result = await stripe.confirmPayment({
      elements, 
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      redirect: "if_required"
    })

    if (result.error) {
      console.log(result.error.message)
    }
    else {
      setMessage("Payment succeeded!");
      
      dispatch(clearBasket);
      console.log("ivyko kazkas")
    }

    
    setIsLoading(false)
  }


  return (
    <form  onSubmit={handleSubmit}>
      <Typography className={styles.header}>Enter Your Payment Details</Typography>
      <PaymentElement id="payment-element" />
      <Button 
        className={styles.submitButton}
        variant='contained' 
        onClick={handleSubmit} 
        type='submit'
        disabled={!stripe || !elements || isLoading} 
        color='secondary'>Submit</Button>
      {message && <h1>{message}</h1>}
    </form>
  );
};

export default CheckoutForm;