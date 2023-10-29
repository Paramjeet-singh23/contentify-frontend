// src/components/StripePaymentForm.js
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Load Stripe using your publishable key
const stripePromise = loadStripe('pk_test_51O6JxDSI35tXO1KeSjUlCI8H1eMGuLiohMbkxFUmGdmb6AN8iwZkc8zqiZsVW2qnhTC2bXo7IkCh8rqBm526RABw00hgRToDyn');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    const result = await stripe.createToken(card);
    if (result.error) {
      console.error(result.error);
    } else {
      // Send the token to your server or handle it according to your needs
      fetch('/charge/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: result.token.id })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          alert("Payment successful!");
        } else {
          alert("Payment failed!");
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const StripePaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripePaymentForm;
