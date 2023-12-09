import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
// tODO...
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK)
const Funding = () => {
  return (
    <div className="pt-40">
      <Helmet>
        <title>Global Blood Fund || Funding</title>
      </Helmet>
      <div className="w-1/3 text-center mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Funding;
