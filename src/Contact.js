import React, { useEffect, useState } from "react";
import axios from "./axios";
import { useStateValue } from "./StateProvider";

const Contact = () => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [state, dispatch] = useStateValue();
  const [submit, setSubmit] = useState("SUBMIT");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit("SUBMITTING");
    const data = {
      name,
      message,
    };
    axios
      .post("/contactus", data)
      .then((res) => {
        console.log(res);
        setMessage("");
        setName("");
        setSubmit("SUBMIT");
        dispatch({
          type: "ADD_MESSAGE",
          payload: "Your message has been sent successfully.",
        });
        dispatch({
          type: "SHOW_NOTIFICATIONCOMPO",
        });
        dispatch({
          type: "SHOW_NOTIFICATION",
        });
      })
      .catch((err) => {
        alert(err.message);
        setSubmit("SUBMIT");
      });
  };
  useEffect(() => {
    dispatch({
      type: "PAYMENT_FALSE",
    });
    dispatch({
      type: "CHANGE_ARR",
      payload: [false, false, false, true, false, false],
    });
  }, []);
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
            Contact us
          </p>
          <div className="md:flex items-center mt-12 w-full">
            <div className="md:w-full flex flex-col">
              <label className="text-base font-semibold leading-none text-gray-800">
                Name
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

          <div>
            <div className="w-full flex flex-col mt-8">
              <label className="text-base font-semibold leading-none text-gray-800">
                Message
              </label>
              <textarea
                tabIndex={0}
                aria-label="leave a message"
                role="textbox"
                type="name"
                className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
              className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none"
            >
              {submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
