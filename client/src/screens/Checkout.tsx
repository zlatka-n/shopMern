import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {useQuery} from "react-query";
import {getPaymentIntent} from "../api/cart";
import {CheckoutForm} from "../components/checkout/CheckoutForm";

type Appearance = {
  theme?: 'stripe' | 'night' | 'flat';
}

export const Checkout = () => {
  const { data: paymentIntentData } = useQuery("paymentIntent", getPaymentIntent );

  const stripePromise = loadStripe("pk_test_51NL96PAHyVnNJZBswqz8kuj0kdR9e8kC66PuDosFDuAD7O5XIskmVQzSINwdNE2pgZj81O13lRSnPDeRJhvzzovT00IfreEXPO");

  const appearance: Appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret: paymentIntentData?.client_secret,
    appearance,
  };

  return (
      <div>
        {paymentIntentData?.client_secret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
  )
}