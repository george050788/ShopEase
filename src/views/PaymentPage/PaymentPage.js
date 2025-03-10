import { Elements } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import CheckoutForm from './CheckoutPayment'
import { loadStripe } from '@stripe/stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../store/features/common'
import { fetchUserDetails } from '../../api/userInfo'
import { selectCartItems } from '../../store/features/cart'

const stripePromise = loadStripe('pk_test_51Qog29KrTuf9k1i3ajsA7IJohf17YvdJ2NtyUlOToreEPk1WOufg3ZQBihb3LAOs3CUBiZtXVkuS8r3k1vW49H6A0058r5pwgZ')

const PaymentPage = (props) => {
  const options = {
    mode: 'payment',
    amount: 100,
    currency: 'usd',
    appearance: {
      theme: 'flat'
    }
  }


  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm  {...props} />
      </Elements>

    </div>
  )
}

export default PaymentPage