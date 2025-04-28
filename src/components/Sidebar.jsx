import { useState } from "react";
import { FaHome, FaWallet, FaChartBar, FaCog, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import profileImage from "../assets/profile.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isDarkMode } = useDarkMode();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Transactions", path: "/wallet", icon: <FaWallet /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-30 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:relative z-30 h-full w-64 p-5 transition-transform duration-300 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        } ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Close button for mobile */}
        <button 
          onClick={toggleSidebar}
          className={`md:hidden absolute top-2 right-2 hover:text-gray-300 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <FaTimes size={20} />
        </button>

        {/* Menu items */}
        <ul className="space-y-4 mt-6">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
                className={({ isActive }) => 
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : isDarkMode 
                        ? "hover:bg-gray-700" 
                        : "hover:bg-gray-200"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile section */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className={`p-3 rounded-lg flex items-center gap-3 mb-2 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-200"
          }`}>
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 overflow-hidden">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='40' r='20' fill='%23ccc'/%3E%3Ccircle cx='50' cy='100' r='30' fill='%23ccc'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">Your Name</p>
              <p className="text-sm opacity-70 truncate">Your Role</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
              isDarkMode 
                ? "hover:bg-gray-700 text-red-400" 
                : "hover:bg-gray-200 text-red-600"
            }`}
          >
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 max-w-full mx-4`}>
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={handleLogout}
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

