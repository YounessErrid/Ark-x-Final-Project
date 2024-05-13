// import TitleCard from "../../../components/Cards/TitleCard"

import { useSelector } from "react-redux";
import TitleCard from "../../../components/TitleCard";
import { useEffect } from "react";

const userSourceData = [
  { source: "Facebook Ads", count: "26,345", conversionPercent: 10.2 },
  { source: "Google Ads", count: "21,341", conversionPercent: 11.7 },
  { source: "Instagram Ads", count: "34,379", conversionPercent: 12.4 },
  { source: "Affiliates", count: "12,359", conversionPercent: 20.9 },
  { source: "Organic", count: "10,345", conversionPercent: 10.3 },
];

function UserChannels() {
  const transactions = useSelector((state) => state.statistics.transactions);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);
  return transactions ? (
    <TitleCard title={"Latest Transactions"}>
      {/** Table Data */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Agency</th>
              <th className="normal-case">Transaction Date</th>
              <th className="normal-case">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((u, k) => {
              return (
                <tr key={k}>
                  <th>{k + 1}</th>
                  <td>{u.agency}</td>
                  <td>{u.transactionDate}</td>
                  <td>{`${u.amount}dh`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  ) : null;
}

export default UserChannels;
