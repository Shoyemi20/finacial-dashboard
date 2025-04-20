import { useState } from "react";
import OverviewCards from "../components/OverviewCards";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";
import IncomeForm from "../components/IncomeForm"; // <-- Import IncomeForm

const Dashboard = () => {
  // Initial budget
  const [budget, setBudget] = useState(2000);

  // Expenses state
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Groceries", amount: 500 },
    { id: 2, name: "Transport", amount: 250 },
  ]);

  // 👇👇👇👇 ADD THIS: Incomes state
  const [incomes, setIncomes] = useState([
    { id: 1, name: "Salary", amount: 1000 },
  ]);

  // Add a new expense
  const addExpense = (newExpense) => {
    setExpenses([...expenses, { id: expenses.length + 1, ...newExpense }]);
  };

  // 👇👇👇👇 ADD THIS: Add a new income
  const addIncome = (newIncome) => {
    setIncomes([...incomes, { id: incomes.length + 1, ...newIncome }]);
  };

  <IncomeForm addIncome={addIncome} />


  return (
    <div className="p-6 bg-gray-100">
      <OverviewCards expenses={expenses} incomes={incomes} budget={budget} />
      

      <div className="grid grid-cols-2 gap-4 mt-4">
        <ExpenseChart expenses={expenses} />
        <ExpenseForm addExpense={addExpense} />
        {/* 👇👇👇 Add Income Form to UI */}
        <IncomeForm addIncome={addIncome} />
      </div>

      <TransactionList expenses={expenses} incomes={incomes} />

    </div>
  );
};

export default Dashboard;


