import React, { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from '@stripe/react-stripe-js'
import axios from 'axios'

let cardOptions = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
}

const Checkout = () => {
  let [successed, setSuccess] = useState(false)
  const stripe = useStripe()
  const element = useElements()

  const handleSubmit = async (e) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: element.getElement(CardElement),
    })
    if (!error) {
      try {
        const { id } = paymentMethod
        const response = await axios.post('/payment', {
          amount: 1000,
          id,
        })
        if (response.data.success) {
          console.log('Payment successful', response.data.success)
          setSuccess(true)
        }
      } catch (err) {
        console.log(err)
      }
      // Show error to your customer (for example, payment details incomplete)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      console.log(error.message)
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="FormRow">
          <CardElement options={cardOptions} />
        </div>
        <button>Pay</button>
      </form>
    </div>
  )
}

export default Checkout
