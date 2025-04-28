import { useState } from "react";
import {
  FaBell,
  FaSearch,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
import profileImage from "../assets/profile.png";


// 🔑 Firebase logout
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

// ✅ Optional: Navigate to login page after logout
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigate = useNavigate(); // used for redirect

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  

  const notifications = [
    { id: 1, text: "New report generated", time: "2 mins ago", read: false },
    { id: 2, text: "Payment received", time: "1 hour ago", read: true },
    { id: 3, text: "System update available", time: "3 hours ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  return (
    <>
    <nav
      className={`sticky top-0 z-10 p-4 shadow-md flex justify-between items-center ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Left - Title & Hamburger */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <h1 className="text-xl font-bold">Personal Dashboard</h1>
      </div>

      {/* Right - Icons & User Info */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div
          className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className={`bg-transparent border-none focus:outline-none w-40 ${
              isDarkMode ? "placeholder-gray-400" : "placeholder-gray-500"
            }`}
          />
        </div>

        {/* Notifications */}
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

          {showNotifications && (
            <div
              className={`absolute right-0 mt-2 w-72 rounded-md shadow-lg py-1 z-50 ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div
                className={`px-4 py-2 border-b ${
                  isDarkMode ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <p className="font-medium">Notifications</p>
                <p className="text-xs">{unreadCount} new notifications</p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-opacity-50 ${
                      isDarkMode
                        ? notification.read
                          ? "hover:bg-gray-600"
                          : "bg-gray-600 hover:bg-gray-500"
                        : notification.read
                        ? "hover:bg-gray-100"
                        : "bg-blue-50 hover:bg-blue-100"
                    }`}
                  >
                    <p className="text-sm">{notification.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isDarkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className={`px-4 py-2 border-t ${
                  isDarkMode ? "border-gray-600" : "border-gray-200"
                }`}
              >
                <button className="text-sm text-blue-500 hover:text-blue-700">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={profileImage}
              alt="User"
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="hidden md:block text-left">
              <p className="font-medium">Your Name</p>
              <p className="text-sm opacity-70">Logged In</p>
            </div>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                View Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                Account Settings
              </button>
              <button
               className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-600 dark:text-red-300"
                onClick={() => setShowLogoutModal(true)}
                >
                Log Out
               </button>
            </div>
          )}
        </div>
      </div>
    </nav>
{showLogoutModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg`}>
      <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
      <p className="mb-6">Are you sure you want to log out?</p>
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          onClick={() => setShowLogoutModal(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => {
            handleLogout();
            setShowLogoutModal(false);
          }}
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

export default Navbar;

