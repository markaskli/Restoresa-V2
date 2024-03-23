import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import { useEffect, useState } from 'react';
import requests from '../../API/requests';
import { Basket } from '../../types/basket';
import { useAppSelector } from '../../stores/store';
import LoadingComponent from '../../components/LoadingComponent';
import styles from './styles.module.css'
import { Typography } from '@mui/material';


const stripePromise = loadStripe('pk_test_51OjHUgKxFGEGIoB5jV0eieeIOFvCy21oKN6DcdLR4wJamWxa48bmr0eYoLuwXAsfqa7hQ9j13zsvIP6scylSpPGj00Olu0nJTI');

function Checkout() {
  const [clientSecret, setClientSecret] = useState("")
  const { status } = useAppSelector(state => state.reservationDetails)

  useEffect(() => {
    requests.Payments.createPaymentIntent()
    .then((response: Basket) => {   
      setClientSecret(response.clientSecret)
    })
  }, [])


  if (status.includes('pending')) {
    return <LoadingComponent message='The order is being processed!'></LoadingComponent>
  }


  const options = {
    clientSecret
  };


  return (
    <div className={styles.box}>
      <Typography className={styles.header}>Enter Your Payment Details</Typography>
      {clientSecret && 
        (<Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>)
      }
    </div>

  )
};

export default Checkout