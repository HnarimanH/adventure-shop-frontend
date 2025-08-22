import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useApi } from "../auth/ApiProvider";
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const {api}  = useApi()
  // Fetch client secret from backend
useEffect(() => {
  const fetchClientSecret = async () => {
    try {
      console.log("Token:", localStorage.getItem("token"));
      await api.Checkout(setClientSecret);
    } catch (err) {
      console.error("Error fetching client secret:", err.response?.data || err.message);
    }
  };
  fetchClientSecret();
}, []);
    if (!clientSecret) return <div>Loading payment...</div>;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
      alert("Payment failed: " + result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      alert("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen flex items-center justify-center bg-white text-gray-500 text-xl mt-10">
      <CardElement />
      <button disabled={!stripe || !clientSecret}>Pay</button>
    </form>
  );
}