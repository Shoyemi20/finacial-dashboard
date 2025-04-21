import { useDarkMode } from "../context/DarkModeContext";
import { Trash2 } from "lucide-react"; // optional: for a nice delete icon

const TransactionList = ({ expenses, incomes, deleteExpense, deleteIncome }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* Expenses Section */}
      <div className={`p-4 rounded-lg shadow transition-colors ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? "text-red-400" : "text-red-600"
        }`}>
          Expenses
        </h2>
        {expenses.length === 0 ? (
          <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            No expenses recorded
          </p>
        ) : (
          <ul className="space-y-2">
            {expenses.map((expense) => (
              <li 
                key={expense.id} 
                className={`flex justify-between items-center py-2 px-2 rounded ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <p className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
                    {expense.name}
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {expense.category} • {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={isDarkMode ? "text-red-400" : "text-red-600"}>
                    -₦{expense.amount.toLocaleString()}
                  </span>
                  <button 
                    onClick={() => deleteExpense(expense.id)}
                    className="p-1 hover:text-red-500"
                    title="Delete expense"
                  >
                    <Trash2 size={16} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Incomes Section */}
      <div className={`p-4 rounded-lg shadow transition-colors ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? "text-green-400" : "text-green-600"
        }`}>
          Incomes
        </h2>
        {incomes.length === 0 ? (
          <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            No incomes recorded
          </p>
        ) : (
          <ul className="space-y-2">
            {incomes.map((income) => (
              <li 
                key={income.id} 
                className={`flex justify-between items-center py-2 px-2 rounded ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                }`}
              >
                <div>
                  <p className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
                    {income.name}
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {income.category} • {new Date(income.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={isDarkMode ? "text-green-400" : "text-green-600"}>
                    +₦{income.amount.toLocaleString()}
                  </span>
                  <button 
                    onClick={() => deleteIncome(income.id)}
                    className="p-1 hover:text-green-500"
                    title="Delete income"
                  >
                    <Trash2 size={16} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionList;


