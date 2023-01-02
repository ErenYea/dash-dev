import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "./axios";
import { useNavigate, useParams } from "react-router-dom";
import { db, doc, setDoc } from "./firebase";
const Payment = () => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    // do all the stripe stuff
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        axios
          .post("/create_api", { email: email, id: paymentIntent.id })
          .then((res) => {
            setDoc(
              doc(db, "users", state.user?.uid, "orders", paymentIntent.id),
              {
                basket: state.basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                api_key: res.data.id,
              }
            );
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
              type: "EMPTY_BASKET",
            });
            dispatch({
              type: "TOGGLE_PAYMENT",
            });
            navigate("/ourservices", { replace: true });
          })
          .catch((err) => console.log(err));

        // db.collection("users")
        //   .doc(state.user?.uid)
        //   .collection("orders")
        //   .doc(paymentIntent.id)
        //   .set({
        //     basket: state.basket,
        //     amount: paymentIntent.amount,
        //     created: paymentIntent.created,
        //   });
      });
  };
  const handleChange = (e) => {
    console.log("hello");
    // Listen for the changes of card Element
    // to display any error as customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  console.log("params>>", params);
  useEffect(() => {
    dispatch({
      type: "CHANGE_ARR",
      payload: [false, false, false, false, false, false],
    });
  }, []);
  useEffect(() => {
    if (parseInt(params.total) > 0) {
      const getClientSecret = async () => {
        const headers = {
          "Access-Control-Allow-Origin": "*",
        };
        const data = {
          total: Math.round(parseInt(params.total) * 100),
          name: name,
          email,
        };
        const response = await axios.post(`/payments/create`, data);
        //   method: "post",
        //   // Stripe expects the total in currencies subunits like if it is dollars then stripe would accept it in cents
        //   url: `/payments/create?total=${getBasketTotal(state.basket) * 100}`,
        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //   },
        // });
        setClientSecret(response.data.clientSecret);
        // setDisabled(false);
      };
      getClientSecret();
    }
  }, []);
  console.log("the Secreat of client>>", clientSecret);
  return (
    <div className="bg-gradient-to-b from-purple-600 to-indigo-700 h-96 w-full z-0">
      <div className="md:px-20 px-4 py-8">
        {show && (
          <nav className="lg:hidden relative z-40">
            <div className="w-full">
              <div className="visible flex items-center">
                <ul
                  id="list"
                  className=" p-2 bg-white absolute rounded top-0 left-0 right-0 shadow mt-6"
                >
                  <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">Home</span>
                    </a>
                  </li>
                  <li
                    className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                    onclick="dropdownHandler(this)"
                  >
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">About</span>
                    </a>
                  </li>
                  <li className="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">Page</span>
                    </a>
                  </li>
                  <li
                    className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                    onclick="dropdownHandler(this)"
                  >
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">Doc</span>
                    </a>
                  </li>
                  <li
                    className="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
                    onclick="dropdownHandler(this)"
                  >
                    <a href="javascript:void(0)">
                      <span className="ml-2 font-bold">Contact</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </div>
      <div className="w-full flex items-center justify-center my-12">
        <div className="absolute top-40 bg-white shadow rounded py-12 lg:px-28 px-8">
          <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
            Payment Info
          </p>
          <div className="md:flex items-center mt-12 w-full">
            <div className="md:w-full flex flex-col">
              <label className="text-base font-semibold leading-none text-gray-800">
                Full Name
              </label>
              <input
                tabIndex={0}
                arial-label="Please input name"
                type="name"
                className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                placeholder="Please input  name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex items-center mt-10 w-full">
            <div className="md:w-full flex flex-col">
              <label className="text-base font-semibold leading-none text-gray-800">
                Email (Script and API Key will be sent to the this email)
              </label>
              <input
                tabIndex={0}
                arial-label="Please input name"
                type="email"
                className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
                placeholder="Please input email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="w-full flex flex-col mt-8">
              <label className="text-base font-semibold leading-none text-gray-800">
                Card Details
              </label>
              <CardElement
                onChange={handleChange}
                className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
              />
            </div>
          </div>
          <p className="text-xs leading-3 text-gray-600 mt-4">
            By clicking submit you agree to our terms of service, privacy policy
            and how we use data as stated
          </p>
          <div className="flex items-center justify-center w-full">
            <button
              onClick={handleSubmit}
              disabled={processing || disabled || succeeded}
              className={`mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded ${
                processing || disabled || succeeded
                  ? ""
                  : "hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none"
              }`}
            >
              {processing ? <p>Processing</p> : "Buy Now"}
            </button>
            {error && <div>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
