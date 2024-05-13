import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TitleCard from "../../../components/TitleCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChartData } from "../../../features/statsSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart() {
  const dispatch = useDispatch();
  const { monthlySubscription } = useSelector((state) => state.statistics);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December", // Ensure labels cover all months you expect data for
  ];

  // Prepare a data array with default values (0) for all months
  const dataValues = new Array(12).fill(0);

  // Populate dataValues with actual data where available
  monthlySubscription.forEach((sub) => {
    const monthIndex = sub.month - 1; // -1 because array is zero-indexed and months are 1-indexed
    dataValues[monthIndex] = sub.totalSubscriptions;
  });

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Subscription per month",
        data: dataValues,
        borderColor: "rgba(125, 156, 171, 1)",
        backgroundColor: "rgba(125, 156, 171, 0.6)",
      },
    ],
  };

  return (
    <TitleCard title={"Monthly Subscription"}>
      <Line data={data} options={options} />
    </TitleCard>
  );
}

export default LineChart;
