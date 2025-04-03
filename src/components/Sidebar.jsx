import { FaHome, FaWallet, FaChartBar, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
      <ul className="space-y-4">
        <li className="flex items-center gap-3"><FaHome /> Home</li>
        <li className="flex items-center gap-3"><FaWallet /> Wallet</li>
        <li className="flex items-center gap-3"><FaChartBar /> Reports</li>
        <li className="flex items-center gap-3"><FaCog /> Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
