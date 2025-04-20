import { useState } from "react";
import OverviewCards from "../components/OverviewCards";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";


const Dashboard = () => {
  // State for budget and expenses
  const [budget, setBudget] = useState(2000); // Initial budget
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Groceries", amount: 500 },
    { id: 2, name: "Transport", amount: 250 },
  ]);

  // Function to add a new expense
  const addExpense = (newExpense) => {
    setExpenses([...expenses, { id: expenses.length + 1, ...newExpense }]);
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Removed Sidebar and Navbar - they're now in App.js */}
      <OverviewCards expenses={expenses} budget={budget} />
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <ExpenseChart expenses={expenses} />
        <ExpenseForm addExpense={addExpense} />
      
      <TransactionList expenses={expenses} />
      </div>
    
    </div>
  );
};



export default Dashboard;
