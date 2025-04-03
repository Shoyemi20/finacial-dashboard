import { FaBell } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [notifications, setNotifications] = useState(3); // Example notification count

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold text-gray-800">Personal Finance</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>

        {/* Notification Bell with Badge */}
        <div className="relative cursor-pointer">
          <FaBell className="text-gray-500 hover:text-gray-700 transition duration-300 text-lg" />
          {notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {notifications}
            </span>
          )}
        </div>

        {/* Profile Image */}
        <img
          src="/profile.png"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
          onError={(e) => (e.target.src = "https://via.placeholder.com/40")} // Fallback image
        />
      </div>
    </nav>
  );
};

export default Navbar;
