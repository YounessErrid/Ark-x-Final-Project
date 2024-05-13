import DashboardStats from "./components/DashboardStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getChartData,
  getLatestTransactions,
  getStats,
} from "../../features/statsSlice";

function Statistics() {
  const dispatch = useDispatch();
  const { revenue, subscriptions, agencies, clients } = useSelector(
    (state) => state.statistics.stats
  );

  useEffect(() => {
    dispatch(getStats());
    dispatch(getChartData());
    dispatch(getLatestTransactions());
  }, [dispatch]);

  const calculateChange = (current, previous) => {
    if (previous === 0) {
      return { change: "N/A", direction: "" }; // Handle division by zero or return an appropriate fallback
    }
    const difference = current - previous;
    const change = (difference / previous) * 100;
    return {
      change: Math.abs(change.toFixed(2)),
      direction: difference >= 0 ? "↗︎" : "↙",
    };
  };

  const statsData = [
    {
      title: "Total Revenue",
      value: `${revenue?.current} Dh` || "0",
      icon: <CreditCardIcon className="w-8 h-8" />,
      description: `${
        calculateChange(revenue?.current, revenue?.previous).direction
      } ${calculateChange(revenue?.current, revenue?.previous).change} %`,
    },
    {
      title: "Subscriptions",
      value: subscriptions?.current || "0",
      icon: <CircleStackIcon className="w-8 h-8" />,
      description: `${
        calculateChange(subscriptions?.current, subscriptions?.previous)
          .direction
      } ${
        calculateChange(subscriptions?.current, subscriptions?.previous).change
      } %`,
    },
    {
      title: "Agencies",
      value: agencies || "0",
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: "",
    },
    {
      title: "Clients",
      value: clients || "0",
      icon: <UsersIcon className="w-8 h-8" />,
      description: "",
    },
  ];

  return (
    <>
      {/** -------------w--------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <BarChart />
      </div>

      {/** ---------------------- User source channels table  ------------------------- */}

      <div>
        {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6"> */}
        <UserChannels />
        {/* <DoughnutChart /> */}
      </div>
    </>
  );
}

export default Statistics;
