import { useState } from "react";

const ExpenseForm = ({ addExpense }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !amount || isNaN(amount)) {
      alert("Please enter a valid name and amount.");
      return;
    }

    // Send data to Dashboard
    addExpense({ name, amount: parseFloat(amount) });

    // Reset form
    setName("");
    setAmount("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Expense Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="e.g. Internet, Food"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Amount (₦)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="e.g. 500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;