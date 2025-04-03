const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Expenses Card */}
      <div className="p-6 bg-white shadow-lg rounded-lg border-l-4 border-red-500 transition transform hover:scale-105 duration-300">
        <h3 className="text-lg font-semibold text-gray-600">Total Expenses</h3>
        <p className="text-3xl font-bold text-red-600">₦1,250</p>
      </div>

      {/* Remaining Budget Card */}
      <div className="p-6 bg-white shadow-lg rounded-lg border-l-4 border-green-500 transition transform hover:scale-105 duration-300">
        <h3 className="text-lg font-semibold text-gray-600">Remaining Budget</h3>
        <p className="text-3xl font-bold text-green-600">₦750</p>
      </div>
    </div>
  );
};

export default OverviewCards;
