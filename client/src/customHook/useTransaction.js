import { useSelector } from "react-redux";

export const useTransaction = (title) => {
  const transactions = useSelector((state) => state.transaction);
  
  const transactionsPerType = transactions.filter(
    (transaction) => transaction.type === title
  );
  const total = transactionsPerType.reduce(
    (acc, currVal) => (acc = acc + currVal.Amount),
    0
  );

  const incomeColors = [
    "#123123",
    "#154731",
    "#165f40",
    "#16784f",
    "#14915f",
    "#10ac6e",
    "#0bc77e",
    "#04e38d",
    "#00ff9d",
  ];
  const expenseColors = [
    "#b50d12",
    "#bf2f1f",
    "#c9452c",
    "#d3583a",
    "#dc6a48",
    "#e57c58",
    "#ee8d68",
    "#f79d79",
    "#ffae8a",
    "#cc474b",
    "#f55b5f",
  ];

  const colors = title === "Income" ? incomeColors : expenseColors;

  const chartData = {
    datasets: [
      {
        data: transactionsPerType.map((t) => t.Amount),
        backgroundColor: colors.map((c) => c),
      },
    ],
    labels: transactionsPerType.map((t) => t.how),
  };

  return { total, chartData };
};
