import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  currency: "USD",
  vault: true,
  intent: 'subscription'
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
      <HelmetProvider>
        <PayPalScriptProvider 
          options={initialOptions}
          style={{
            shape: 'pill',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe'
        }}
        >
            <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </ThemeProvider>
);


reportWebVitals();
