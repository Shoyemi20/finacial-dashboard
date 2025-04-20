const OverviewCards = ({ expenses, budget }) => {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = budget - totalSpent;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Budget</h3>
        <p className="text-2xl font-bold text-green-500">₦{budget.toLocaleString()}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Total Spent</h3>
        <p className="text-2xl font-bold text-red-500">₦{totalSpent.toLocaleString()}</p>
      </div>
      <div className="bg-white p-4 rounded shadow text-center">
        <h3 className="text-lg font-semibold">Remaining</h3>
        <p className={`text-2xl font-bold ${balance < 0 ? "text-red-600" : "text-blue-600"}`}>
         ₦{balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OverviewCards;

