import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OverviewCards from "../components/OverviewCards";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseForm from "../components/ExpenseForm";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Navbar />
        <OverviewCards />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <ExpenseChart />
          <ExpenseForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
