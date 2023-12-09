import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const CheckoutForm = () => {
  const [error, setErroor] = useState("");
  const [amount, setAmount] = useState(1);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const [loading, setLoading] = useState(false);
  console.log(amount);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .post("/create-payment-intent", { donation: amount })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure, amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const amount = form.get("amount");
    setAmount(amount);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setErroor(error.message);
    } else {
      console.log("paymment method", paymentMethod);
      setErroor("");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <CardElement
            className="border p-3"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <p className="text-red-500">{error}</p>
          <input
            type="number"
            name="amount"
            className="border w-full p-3"
            placeholder="write your amount..."
            onBlur={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button
          className="btn btn-success text-center w-full mt-10 text-white"
          type="submit"
          disabled={!stripe || clientSecret || loading}
        >
          {loading ? "Loading..." : "Donate"}
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;

// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
// import UseAuth from "../../../hooks/UseAuth";

// const CheckoutForm = () => {
//   const [error, setError] = useState("");
//   const { user } = UseAuth();
//   const [amount, setAmount] = useState("");
//   const [clientSecret, setClientSecret] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = UseAxiosSecure();
//   const [loading, setLoading] = useState(false);

//   const handleAmount = async (event) => {
//     event.preventDefault();
//     const form = new FormData(event.currentTarget);
//     const amount = form.get("amount");
//     setAmount(amount);
//   };

//   useEffect(() => {
//     if (amount !== "") {
//       setLoading(true);
//       axiosSecure
//         .post("/create-payment-intent", { donation: amount })
//         .then((res) => {
//           console.log(res.data.clientSecret);
//           setClientSecret(res.data.clientSecret);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   }, [axiosSecure, amount]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements || loading) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     if (!card) {
//       return;
//     }

//     try {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card,
//       });

//       if (error) {
//         console.log("Payment error:", error);
//         setError(error.message);
//       } else {
//         console.log("Payment method:", paymentMethod);
//         setError("");

//         // Confirm payment:
//         const { paymentIntent, error: confirmError } =
//           await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//               card: card,
//               billing_details: {
//                 name: user?.displayName || "anonymous",
//                 email: user?.email || "anonymous",
//               },
//             },
//           });

//         if (confirmError) {
//           console.log("Confirm error:", confirmError);
//         }

//         if (paymentIntent?.status === "succeeded") {
//           console.log("Transaction ID:", paymentIntent.id);
//         }
//       }
//     } catch (error) {
//       console.error("Stripe API error:", error);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div className="my-10">
//         <form onSubmit={handleAmount}>
//           <div className="flex gap-3">
//             <input
//               type="number"
//               name="amount"
//               className="border w-full p-3"
//               placeholder="Enter your donation amount..."
//             />
//             <input
//               className="btn btn-accent"
//               type="submit"
//               value="Set Amount"
//             />
//           </div>
//         </form>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="space-y-3">
//           <CardElement
//             className="border p-3"
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": {
//                     color: "#aab7c4",
//                   },
//                 },
//                 invalid: {
//                   color: "#9e2146",
//                 },
//               },
//             }}
//           />
//           <p className="text-red-500">{error}</p>
//         </div>
//         <button
//           className="btn btn-success text-center w-full mt-10 text-white"
//           type="submit"
//           disabled={!stripe || !clientSecret || loading}
//         >
//           {loading ? "Loading..." : "Donate"}
//         </button>
//       </form>
//     </>
//   );
// };

// export default CheckoutForm;

// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
// import UseAuth from "../../../hooks/UseAuth";

// const CheckoutForm = () => {
//   const [error, setError] = useState("");
//   const [clientSecret, setClientSecret] = useState("");

//   const [transaction, setTransaction] = useState(null);
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = UseAxiosSecure();

//   const [price, setPrice] = useState(1);

//   const { user } = UseAuth();

//   useEffect(() => {
//     axiosSecure
//       .post("/create-payment-intent", { donation: price })
//       .then((res) => {
//         console.log("sdfsdfsdf", res.data.clientSecret);
//         setClientSecret(res.data.clientSecret);
//       })
//       .catch((error) => {
//         console.log("error", error);
//       });
//   }, [axiosSecure]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     if (card === null) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("payment error", error);
//       setError(error.message);
//     } else {
//       console.log("payment method", paymentMethod);
//       setError("");
//     }

//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             email: user?.email || "anonymous",
//             name: user?.displayName || "anonymous",
//           },
//         },
//       });
//     if (confirmError) {
//       console.log("confirm error");
//     } else {
//       console.log("payment intent", paymentIntent);
//       if (paymentIntent.status === "succeeded") {
//         setTransaction(paymentIntent.id);

//         const funding = {
//           fund: price,
//         };
//         axiosSecure
//           .post("/funds", funding)
//           .then((res) => {
//             console.log(res);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     }
//   };
//   return (
//     <div className="px-4">
//       <form
//         className="md:w-[40%]  mx-auto p-10 shadow-lg space-y-4"
//         onSubmit={handleSubmit}
//       >
//         <div className="border border-gray-500 p-4 rounded-lg">
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": {
//                     color: "#aab7c4",
//                   },
//                 },
//                 invalid: {
//                   color: "#9e2146",
//                 },
//                 border: "1px solid black",
//               },
//             }}
//           ></CardElement>
//         </div>
//         <div>
//           <input
//             placeholder="Enter Your Donation Amount"
//             className="border w-full  focus:outline focus:outline-gray-500 border-gray-400 p-3 rounded-lg placeholder:font-semibold placeholder:text-[#9CA3AF]/90"
//             type="number"
//             onBlur={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-red-500 active:bg-red-700 px-8 py-2  rounded-lg text-white font-semibold my-6"
//             disabled={!stripe}
//           >
//             Donate
//           </button>
//         </div>
//         <p className="text-red-500">{error}</p>
//         {transaction && (
//           <p className="text-green-500">
//             Transaction ID: <span className="font-semibold">{transaction}</span>{" "}
//             was successful
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;
