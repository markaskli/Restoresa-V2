import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useState } from 'react';
import styles from './styles.module.css'
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../stores/store';
import { submitReservationDetails } from '../../stores/slices/reservationDetailsSlice';
import { clearBasket } from '../../stores/slices/basketSlice';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {basket} = useAppSelector(state => state.basket)
  const { user } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements || !basket || !user) {
      return;
    }

    setIsLoading(true)
    dispatch(
      submitReservationDetails({
        reservedDate: basket.reservedDate,
        reservedTime: basket.reservedTime,
        seats: basket.seats,
        customerId: user.id,
        restaurantId: basket.restaurant.id,
      })
    ); 

    const result = await stripe.confirmPayment({
      elements, 
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      redirect: "if_required"
    })

    if (result.error) {
      toast.error("Payment unsuccessful")
      console.log(result.error.message)
    }
    else {
      toast.success("Payment succeeded!")
      dispatch(clearBasket());
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
    </form>
  );
};

export default CheckoutForm;