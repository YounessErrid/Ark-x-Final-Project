import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TitleCard from "../../../components/TitleCard";
import { useDispatch, useSelector } from "react-redux";
// import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const { monthlyRevenue } = useSelector((state) => state.statistics);

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
    "December",
  ];

  const dataValues = new Array(12).fill(0);

  monthlyRevenue.forEach((sub) => {
    const monthIndex = sub.month - 1;
    dataValues[monthIndex] = sub.totalRevenue;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue per month",
        data: dataValues,
        backgroundColor: "rgba(255, 159, 64, 1)",
        hoverBackgroundColor: "rgba(255, 169, 74, 1)",
      },
    ],
  };

  return (
    <TitleCard title={"Monthly Revenue"}>
      <Bar options={options} data={data} />
    </TitleCard>
  );
}

export default BarChart;
