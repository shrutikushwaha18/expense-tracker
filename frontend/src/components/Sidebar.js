import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-[#0f172a] text-white p-5 flex flex-col justify-between">
      
      {/* TOP MENU */}
      <div>
        <h1 className="text-2xl font-bold mb-8">💰 ExpenseApp</h1>

        <ul className="space-y-4">
          <li
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer hover:text-blue-400"
          >
            📊 Dashboard
          </li>

          <li
            onClick={() => navigate("/expenses")}
            className="cursor-pointer hover:text-blue-400"
          >
            💸 Expenses
          </li>

          <li
            onClick={() => navigate("/analytics")}
            className="cursor-pointer hover:text-blue-400"
          >
            📈 Analytics
          </li>

          {/* SETTINGS */}
          <li className="cursor-pointer hover:text-blue-400">
            ⚙️ Settings
          </li>
        </ul>
      </div>

      {/* BOTTOM (SETTINGS ACTIONS) */}
      <div className="border-t border-gray-700 pt-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;