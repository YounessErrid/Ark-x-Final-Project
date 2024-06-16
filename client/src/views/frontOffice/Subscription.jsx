import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51P2yVE06sb7pwrAB80oCcrMIdYHKaqejx4ekh4fXPKspuwU7gPgLUbPBbGJHjXlHycUfYUZdv4QUKcJl1tyYMuRl00unWBOHw3"
);

const plans = [
  {
    priceId: "price_1P2yct06sb7pwrABc9MaEEFB",
    price: 500,
    duration: "/month",
  },
  {
    priceId: "price_1PHpAi06sb7pwrABVZE7TYss",
    price: 2400,
    duration: "/year",
  },
];

const Subscription = () => {
  const {user, isAuthenticated} = useSelector((state) => state.user);
  const [plan, setPlan] = useState(plans[0]);
  const [error, setError] = useState("");
  const [userCredential, setUserCredential] = useState({
    priceId: "",
    email: "",
  });
  const navigate = useNavigate();

  // useEffect(()=>{
  //   console.log("uuserCredential",userCredential);
  // },[userCredential])

  useEffect(() => {
    if (user && user.email) {
      setUserCredential({ priceId: plan.priceId, email: user.email });
    }
  }, [user, plan]);

  useEffect(() => {
    if(!user && !isAuthenticated) navigate("/login")
    if (user && user.hasAccess === true) {
        navigate("/portfolio");
    }
    
  }, [user, navigate]);

  const handleSubscribe = async () => {
    try {
      const { data } = await axiosInstance.post("/checkout", userCredential);

      // console.log(data);

      const stripe = await stripePromise;

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <section
      id="pricing"
      style={{
        backgroundColor: "#FFFDFD",
        color: "#000000",
        minHeight: "100vh",
      }}
    >
      <div className="py-24 px-8 max-w-5xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <p className="font- text-xl text-primary mb-5">Pricing</p>
          <h2
            className="font-bold text-3xl lg:text-4xl tracking-tight"
            style={{ color: "#000000" }}
          >
            Choose Your Plan
          </h2>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          <div className="w-full max-w-lg">
            <div
              className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-xl"
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex items-center gap-8">
                <div
                  className="flex items-center gap-2"
                  onClick={() => setPlan(plans[0])}
                >
                  <input
                    type="radio"
                    name="plan"
                    className="radio"
                    checked={plan.price === plans[0].price}
                    onChange={() => setPlan(plans[0])} // Add onChange handler
                  />
                  <span>Pay monthly</span>
                </div>
                <div
                  className="flex items-center gap-2"
                  onClick={() => setPlan(plans[1])}
                >
                  <input
                    type="radio"
                    name="plan"
                    className="radio bg-white"
                    checked={plan.price === plans[1].price}
                    onChange={() => setPlan(plans[1])} // Add onChange handler
                  />
                  <span>Pay yearly (60% OFF 💰)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <p className="text-4xl tracking-tight font-extrabold">
                  {plan.price}Dh
                </p>
                <div className="flex flex-col justify-end mb-[4px]">
                  <p className="text-sm tracking-wide text-base-content/80 uppercase font-semibold">
                    {plan.duration}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                {[
                  { name: "The benifits you will get" },
                  { name: "User oauth" },
                  { name: "The benifits you will get" },
                  { name: "Emails" },
                  { name: "1 year of updates" },
                  { name: "24/7 support" },
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-[18px] h-[18px] opacity-80 shrink-0"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2">
                <button
                  className="btn btn-primary bg-primary text-white btn-block focus:outline-none"
                  onClick={handleSubscribe}
                  style={{
                    backgroundColor: "#F9AB77",
                    color: "#FFFFFF",
                    border: "none",
                    outline: "none",
                  }}
                >
                  Subscribe
                </button>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
