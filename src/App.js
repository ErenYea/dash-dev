import "./App.css";
import Contact from "./Contact";
import Header from "./Header";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import CustomizeService from "./CustomizeService";
import Aboutus from "./Aboutus";
import { useStateValue } from "./StateProvider";
import Notification from "./Notification";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Services from "./Services";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "./axios";

import ParticularService from "./ParticularService";
import NotFound from "./NotFound";

const promise = loadStripe(
  "pk_test_51LwrwHL0uAH7L9TA1s7DTIrN4XuoYDKJ00heTecCyhxkgJr0RdWBGJtrhgA6bPAZZgoBz4YpcJEizuF3kNzQDRqm00338EihP2"
);
function App() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    axios.get("/");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        dispatch({
          type: "ADD_USER",
          payload: user,
        });

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  useEffect(() => {
    document.title = state.title;
  }, [state.title]);

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="contactus"
          element={
            <>
              <Header />
              {state.shownotificationcompo ? (
                <Notification data={"Product has been added"} />
              ) : (
                ""
              )}
              <Contact />
            </>
          }
        />
        <Route
          path="customizeservice"
          element={
            <>
              <Header />
              {state.shownotificationcompo ? (
                <Notification data={"Product has been added"} />
              ) : (
                ""
              )}
              <CustomizeService />
            </>
          }
        />
        <Route
          path="aboutus"
          element={
            <>
              <Header />
              <Aboutus />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/ourservices"
          element={
            <>
              <Header />
              {state.shownotificationcompo ? (
                <Notification data={"Product has been added"} />
              ) : (
                ""
              )}
              <Services />
            </>
          }
        />
        <Route
          path="/ourservices/:path"
          element={
            <>
              <Header />
              {state.shownotificationcompo ? (
                <Notification data={"Product has been added"} />
              ) : (
                ""
              )}
              <ParticularService />
            </>
          }
        />
        {state.paymentcond ? (
          <Route
            path="/payment/:total"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
        ) : (
          ""
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* </div> */}
    </div>
  );
}

export default App;
