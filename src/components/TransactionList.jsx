const TransactionList = ({ expenses, incomes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* Expenses Section */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet</p>
        ) : (
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className="flex justify-between py-1 border-b">
                <span>{expense.name}</span>
                <span className="text-red-600">-₦{expense.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Incomes Section */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-green-500">Incomes</h2>
        {incomes.length === 0 ? (
          <p className="text-gray-500">No incomes yet</p>
        ) : (
          <ul>
            {incomes.map((income) => (
              <li key={income.id} className="flex justify-between py-1 border-b">
                <span>{income.name}</span>
                <span className="text-green-600">+₦{income.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionList;


