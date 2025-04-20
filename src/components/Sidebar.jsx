import { FaHome, FaWallet, FaChartBar, FaCog, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import profileImage from "../assets/profile.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isDarkMode } = useDarkMode();

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Wallet", path: "/wallet", icon: <FaWallet /> },
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

      <aside 
        className={`fixed md:relative z-30 h-full w-64 p-5 transition-transform duration-300 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
        } ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Dashboard Menu</h2>
          <button 
            onClick={toggleSidebar}
            className={`md:hidden hover:text-gray-300 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
                className={({ isActive }) => 
                  `flex items-center gap-3 p-3 rounded-lg ${
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

        {/* User Profile at Bottom */}
        <div className={`absolute bottom-5 left-5 right-5 p-3 rounded-lg flex items-center gap-3 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-200"
        }`}>
          <div className="flex items-center gap-2">
                   <img
                     src={profileImage}
                     alt="Your Name"
                     className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                   />
                   <div>
                     <p className="font-medium">Your Name</p>{" "}
                     {/* Update with your name */}
                     <p className="text-sm opacity-70">Your Role</p>{" "}
                     {/* Update with your role */}
                   </div>
                 </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

