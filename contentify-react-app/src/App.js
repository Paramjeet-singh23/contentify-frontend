// src/App.js
import React from 'react';
import './App.css';
import StripePaymentForm from './components/StripePaymentForm';

function App() {
  return (
    <div className="App">
      <h1>Stripe Payment</h1>
      <StripePaymentForm />
    </div>
  );
}

export default App;
