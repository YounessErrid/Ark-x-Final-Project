import React, { useState, useEffect } from "react";

export const Spinner = ({ loaded }) => {
  
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    let timer;
    if (loaded) {
      // If data is loaded, start a timer to hide the spinner after 3 seconds
      timer = setTimeout(() => {
        setShowSpinner(false);
      }, 1000);
    } else {
      // If data is not yet loaded, ensure the spinner is visible
      setShowSpinner(false);
    }

    // Clean up the timer when the component unmounts or when loaded changes
    return () => clearTimeout(timer);
  }, [loaded]);

  return (
    // Render the spinner only if showSpinner is true
    showSpinner && (
      <div className="z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="loading loading-bars loading-lg "></div>
      </div>
    )
  );
};
