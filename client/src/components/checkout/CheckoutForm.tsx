import { TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useStripe, useElements, CardElement,
} from '@stripe/react-stripe-js';
import { useQueryClient } from 'react-query';
import { postPay } from '../../api/cart';

export function CheckoutForm() {
  const [email, setEmail] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (event) => {
    if (!stripe || !elements) {
      return;
    }
    // const res = await axios.post('http://localhost:4000/order/pay', { email });

    const res = await postPay(email);
    const clientSecret = res.client_secret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email,
        },
      },
    });

    if (result?.error) {
      // TODO: navigate to error page
    }

    if (result?.paymentIntent?.status === 'succeeded') {
      navigate('/success-payment/order', { state: { paymentResult: result } });
      queryClient.invalidateQueries('cart');
    }
  };

  return (
    <>
      <TextField
        label="Email"
        id="outlined-email-input"
        helperText={'Email you\'ll recive updates and receipts on'}
        margin="normal"
        variant="outlined"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <CardElement />
      <button type="button" onClick={handleSubmitPay}>Submit</button>
    </>
  );
}
