import { useState } from "react";
import OverviewCards from "../components/OverviewCards";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";
import IncomeForm from "../components/IncomeForm";
import BudgetForm from "../components/BudgetForm";

const Dashboard = () => {
  const [budget, setBudget] = useState(2000);

  const [expenses, setExpenses] = useState([
    { id: 1, name: "Groceries", amount: 500 },
    { id: 2, name: "Transport", amount: 250 },
  ]);

  const [incomes, setIncomes] = useState([
    { id: 1, name: "Salary", amount: 1000 },
  ]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { id: Date.now(), ...newExpense }]);
  };

  const addIncome = (newIncome) => {
    setIncomes([...incomes, { id: Date.now(), ...newIncome }]);
  };

  const addBudget = (newBudget) => {
    setBudget(parseFloat(newBudget.amount));
  };


  // Delete an expense
const deleteExpense = (id) => {
  setExpenses(expenses.filter((expense) => expense.id !== id));
};

// Delete an income
const deleteIncome = (id) => {
  setIncomes(incomes.filter((income) => income.id !== id));
};


  return (
    <div className="p-6 bg-gray-100 container mx-auto space-y-6">
      {/* 1. Overview on top */}
      <OverviewCards 
        expenses={expenses} 
        incomes={incomes} 
        budget={budget} 
      />

      {/* 2. Expense chart + form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseChart expenses={expenses} />
        <ExpenseForm addExpense={addExpense} />
      </div>

      {/* 3. Income + budget form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IncomeForm addIncome={addIncome} />
        <BudgetForm addBudget={addBudget} />
      </div>

      {/* 4. Transaction list at the bottom */}
      <TransactionList 
  expenses={expenses} 
  incomes={incomes} 
  deleteExpense={deleteExpense} 
  deleteIncome={deleteIncome} 
/>
    </div>
  );
};

export default Dashboard;


