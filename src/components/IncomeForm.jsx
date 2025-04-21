import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const IncomeForm = ({ addIncome }) => {
  const { isDarkMode } = useDarkMode();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !amount || isNaN(amount)) {
      alert("Please enter valid income details");
      return;
    }

    addIncome({ 
      name, 
      amount: parseFloat(amount),
      category,
      date
    });

    setName("");
    setAmount("");
  };

  const incomeCategories = [
    "Salary", "Freelance", "Investment", 
    "Business", "Gift", "Rental", 
    "Dividends", "Other"
  ];

  return (
    <div className={`p-6 rounded-lg shadow-md transition-colors ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}>
      <h2 className={`text-lg font-semibold mb-4 ${
        isDarkMode ? "text-gray-100" : "text-gray-800"
      }`}>
        Add New Income
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block mb-1 font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Income Source
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 rounded-md border ${
              isDarkMode 
                ? "bg-gray-700 border-gray-600 text-gray-100 focus:border-green-500" 
                : "bg-white border-gray-300 text-gray-800 focus:border-green-500"
            }`}
            placeholder="e.g. Salary, Freelance Work"
            required
          />
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
              placeholder="50000"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className={`block mb-1 font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}>
              Date Received
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full p-2 rounded-md border ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-100" 
                  : "bg-white border-gray-300 text-gray-800"
              }`}
              required
            />
          </div>
        </div>

        <div>
          <label className={`block mb-1 font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            Income Type
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
            {incomeCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            isDarkMode 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Add Income
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;

