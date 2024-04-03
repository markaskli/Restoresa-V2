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
import { toast } from 'react-toastify';


const stripePromise = loadStripe('pk_test_51OjHUgKxFGEGIoB5jV0eieeIOFvCy21oKN6DcdLR4wJamWxa48bmr0eYoLuwXAsfqa7hQ9j13zsvIP6scylSpPGj00Olu0nJTI');

function Checkout() {
  const [clientSecret, setClientSecret] = useState("")


  useEffect(() => {
    try {
      requests.Payments.createPaymentIntent()
      .then((response: Basket) => {   
        setClientSecret(response.clientSecret)
      })
    }
    catch (error) {
      toast.error("An error occurred")
      console.log(error)
    }
    

  }, [])


  const options = {
    clientSecret,
    loader: "always" as const 
  };

  if (!clientSecret) return <LoadingComponent></LoadingComponent>

  return (
    <div className={styles.box}>     
      {clientSecret && stripePromise && 
        (<Elements stripe={stripePromise} options={options} >
          <CheckoutForm />
        </Elements>)
      }
    </div>

  )
};

export default Checkout