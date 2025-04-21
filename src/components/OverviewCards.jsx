import { useDarkMode } from "../context/DarkModeContext";

const OverviewCards = ({ expenses, incomes, budget }) => {
  const { isDarkMode } = useDarkMode();
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalSpent;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Budget Card */}
      <div className={`p-4 rounded-lg shadow transition-colors ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h3 className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Budget</h3>
        <p className="text-xl font-semibold text-green-500">₦{budget}</p>
      </div>

      {/* Income Card */}
      <div className={`p-4 rounded-lg shadow transition-colors ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h3 className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Income</h3>
        <p className="text-xl font-semibold text-blue-500">₦{totalIncome}</p>
      </div>

      {/* Spent Card */}
      <div className={`p-4 rounded-lg shadow transition-colors ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h3 className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Spent</h3>
        <p className="text-xl font-semibold text-red-500">₦{totalSpent}</p>
      </div>

      {/* Balance Card */}
      <div className={`p-4 rounded-lg shadow transition-colors ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h3 className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Balance</h3>
        <p className={`text-xl font-semibold ${
          balance < 0 
            ? "text-red-500" 
            : isDarkMode 
              ? "text-purple-400" 
              : "text-purple-600"
        }`}>
          ₦{balance}
        </p>
      </div>
    </div>
  );
};

export default OverviewCards;

