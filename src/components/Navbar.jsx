import { useState } from "react";
import { FaBell, FaSearch, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = ({ toggleSidebar }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "New report generated", time: "2 mins ago", read: false },
    { id: 2, text: "Payment received", time: "1 hour ago", read: true },
    { id: 3, text: "System update available", time: "3 hours ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className={`sticky top-0 z-10 p-4 shadow-md flex justify-between items-center ${
      isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
    }`}>
      {/* Mobile menu button (left side) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <FaBars />
      </button>

      {/* Search bar (hidden on mobile) */}
      <div className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg ${
        isDarkMode ? "bg-gray-700" : "bg-gray-100"
      }`}>
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className={`bg-transparent border-none focus:outline-none w-40 ${
            isDarkMode ? "placeholder-gray-400" : "placeholder-gray-500"
          }`}
        />
      </div>

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        {/* Mobile search button (replaces search bar) */}
        <button className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <FaSearch />
        </button>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative"
          >
            <FaBell />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

