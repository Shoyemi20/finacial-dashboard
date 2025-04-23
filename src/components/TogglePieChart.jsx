import { useState } from "react";
import ExpenseChart from "./ExpenseChart";
import IncomePieChart from "./IncomePieChart";

const TogglePieChart = ({ expenses, incomes }) => {
  const [showExpenseChart, setShowExpenseChart] = useState(true);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="flex justify-center mb-4 space-x-4">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition ${
            showExpenseChart
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setShowExpenseChart(true)}
        >
          Expenses
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition ${
            !showExpenseChart
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setShowExpenseChart(false)}
        >
          Incomes
        </button>
      </div>

      {showExpenseChart ? (
        <ExpenseChart expenses={expenses} />
      ) : (
        <IncomePieChart incomes={incomes} />
      )}
    </div>
  );
};

export default TogglePieChart;

