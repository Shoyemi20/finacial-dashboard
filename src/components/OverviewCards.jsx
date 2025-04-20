
  const OverviewCards = ({ expenses, incomes, budget }) => {
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalSpent;
  

  return (
    <div className="grid grid-cols-4 gap-4">
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-gray-600">Budget</h3>
      <p className="text-xl font-semibold text-green-500">₦{budget}</p>
    </div>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-gray-600">Income</h3>
      <p className="text-xl font-semibold text-blue-500">₦{totalIncome}</p>
    </div>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-gray-600">Spent</h3>
      <p className="text-xl font-semibold text-red-500">₦{totalSpent}</p>
    </div>
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-gray-600">Balance</h3>
      <p className={`text-xl font-semibold ${balance < 0 ? "text-red-600" : "text-purple-600"}`}>
      ₦{balance}
      </p>
    </div>
  </div>
  );
};

export default OverviewCards;




