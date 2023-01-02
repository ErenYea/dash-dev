import React from "react";

const NotFound = () => {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-indigo-600">ERROR 404</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Page Not Found
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Either you are trying to access an unauthorized page or either page
            does not access. Please contact the administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
