import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const Services = () => {
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();
  const handleType = (count) => {
    console.log(count);
  };
  const handleDone = () => {
    console.log("Done after 5 loops");
  };
  const buythisone = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: { price: 500, title: "ZIllow site" },
    });
    navigate("/payment");
  };
  useEffect(() => {
    dispatch({
      type: "PAYMENT_FALSE",
    });
    dispatch({
      type: "CHANGE_ARR",
      payload: [false, true, false, false, false, false],
    });
    dispatch({
      type: "SET_TITLE",
      payload: { title: "Our Services" },
    });
  }, []);
  // return (
  //   <div className="flex flex-wrap sm:flex-no-wrap items-center justify-evenly w-full  mt-20">
  //     <div className="w-full sm:w-1/3 h-64 rounded-t sm:rounded-l sm:rounded-t-none shadow bg-" />
  //     <div className="w-full sm:w-1/3 h-64 shadow bg-white dark:bg-gray-800" />
  //   </div>
  // );
  return (
    <div className="flex overflow-y-auto justify-center items-center backdrop-blur-xl bg-white/30">
      <div className="2xl:mx-auto 2xl:container flex flex-col items-center lg:px-20 lg:py-16 md:py-12 md:px-6 py-9 px-4 w-96 sm:w-auto">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl font-semibold leading-9 text-center text-gray-800">
            Our Services
          </h1>
          <p className="text-base leading-normal text-center text-gray-600 mt-4 lg:w-1/2 md:w-10/12 w-11/12">
            If you're looking for random paragraphs, you've come to the right
            place. When a random word or a random sentence isn't quite enough
          </p>
        </div>
        <div className="lg:flex items-stretch md:mt-12 mt-8 h-96 justify-evenly w-full">
          <div class="max-w-sm rounded-lg shadow-2xl h-fit drop-shadow-md hover:drop-shadow-xl">
            <img
              class="w-full h-48"
              src="home.jpg"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">The RealState Data</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
                onClick={() => navigate("/ourservices/realstate")}
              >
                See More
                <KeyboardDoubleArrowRightIcon />
              </span>
            </div>
          </div>
          <div class="max-w-sm rounded-lg shadow-2xl h-fit drop-shadow-md hover:drop-shadow-xl">
            <img
              class="w-full h-48 cover"
              src="bag.jpg"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">The E-Commerce Data</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
                onClick={() => navigate("/ourservices/eccomerce")}
              >
                See More
                <KeyboardDoubleArrowRightIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
