import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)
  const handleRedirect = () => {
    navigate(`/portfolio/${user?.agencyId}`, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFDFD]">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Subscription Activated!</h2>
        <p className="text-gray-700 mb-4">
          Your subscription is now active. You have now access to all of our services.
        </p>
        
        <button
          onClick={handleRedirect}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600"
        >
          Go to Home Page
        </button>
        <p className=" mt-4">
          Go back Home page and refresh the page
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
