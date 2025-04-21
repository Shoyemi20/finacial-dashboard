import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const BudgetForm = ({ addBudget }) => {
  const { isDarkMode } = useDarkMode();
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("monthly");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid budget amount");
      return;
    }

    addBudget({ 
      category,
      amount: parseFloat(amount),
      period
    });

    setAmount("");
  };

  const budgetCategories = [
    "Food", "Transportation", "Housing", 
    "Utilities", "Entertainment", "Healthcare", 
    "Shopping", "Savings", "Other"
  ];

  const budgetPeriods = [
    "weekly", "monthly", "quarterly", "yearly"
  ];

  return (
    <div className={`p-6 rounded-lg shadow-md transition-colors ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}>
      <h2 className={`text-lg font-semibold mb-4 ${
        isDarkMode ? "text-gray-100" : "text-gray-800"
      }`}>
        Set New Budget
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block mb-1 font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-2 rounded-md border ${
              isDarkMode 
                ? "bg-gray-700 border-gray-600 text-gray-100" 
                : "bg-white border-gray-300 text-gray-800"
            }`}
          >
            {budgetCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Amount (₦)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full p-2 rounded-md border ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-100" 
                  : "bg-white border-gray-300 text-gray-800"
              }`}
              placeholder="5000"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Period
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className={`w-full p-2 rounded-md border ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-100" 
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              {budgetPeriods.map((period) => (
                <option key={period} value={period}>
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isDarkMode 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Set Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;

