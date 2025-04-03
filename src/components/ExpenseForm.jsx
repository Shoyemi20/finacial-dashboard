import { useState } from "react";

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;
    onAddExpense({ amount, category });
    setAmount("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold">Add Expense</h3>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded-md mt-2"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;