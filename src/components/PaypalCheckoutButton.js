import React, { useState, useEffect } from "react";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import { handleError, handleSuccess } from '../untils';

const PaypalCheckoutButton = (props) => {
    const {product} = props;
    const [cash, setCash] = useState('');
    const [loggedInUser, setLoggedInUser] = useState('');
    const [loggedInMail, setLoggedInMail] = useState('');
    
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
        setCash(localStorage.getItem('cash'))
        setLoggedInMail(localStorage.getItem('loggedInMail'))
      
      
      }, [])
    const handleApprove = (orderId) => {
        setPaidFor(true);
    }

    if(paidFor){
        alert("Nạp xu thành công");
    }

    if(error){
        alert(error);
    }

  return (
    <PayPalScriptProvider>
        <PayPalButtons 
           
            createOrder = {(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: product.description,
                            amount: {
                                value: product.price,
                            },
                        },
                    ],
                });
            }}
            onApprove = { async (data, action) => {
                const order = await action.order.capture();
                console.log("order", order);

                handleApprove(data.orderID);
                const currentCash = parseFloat(cash) || 0; // Ensure cash is a number
                const newCash = currentCash +100;
                setCash(newCash.toString()); // Update state
                localStorage.setItem('cash', newCash.toString()); // Update local storage
                try{
                    const cashUpdateUrl = `http://localhost:8000/auth/updatecash`;
                    const response =  fetch(cashUpdateUrl, {
                      method: "POST",
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ email: loggedInMail, cash: newCash }) // Update cash in the database
                    });
                    const result =  response.json();
                    const { success, message, error } = result;
                    if (success) {
                      handleSuccess(message);
                    } else if (error) {
                      handleError(error);
                    }
                  }
                  catch(err){
                    handleError(err);
                  }
            }}
            onCancel={() => {}}
            onError={(err) => {
                setError(err);
                console.log("PayPal Checkout onError", err);
            }}
        />
    </PayPalScriptProvider>
  )
}

export default PaypalCheckoutButton