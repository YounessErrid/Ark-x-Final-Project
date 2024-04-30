import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TanstackTable } from "../components/TanstackTable";
import { Spinner } from "../components/Spinner";
import { fetchPayments } from "../features/paymentsSlice";

const Payments = () => {
  const { payments, error, loading } = useSelector((state) => state.payments);
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();

  const columns = [{ date: "Date" }, { amount: "Amount" }];
  useEffect(() => {
    dispatch(fetchPayments());
    setDataLoaded(true);
  }, [dispatch]);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Hello Evano,👋🏼</h1>
      </div>
      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-6">
          <div>
            <h1 className="font-bold text-2xl">All Payments</h1>
            <p className="text-green-500">Active Payments</p>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      {loading && !dataLoaded && <Spinner />}
      {/* {error && error} */}
      {payments && (
        <>
          {/* Pass loaded=true to indicate data has been loaded */}
          <Spinner loaded={false} />
          <TanstackTable data={payments} columnsDef={columns} />
        </>
      )}
    </div>
  );
};

export default Payments;
