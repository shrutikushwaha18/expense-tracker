import React from "react";
import ChangePassword from "./ChangePassword";

const Settings = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* USER INFO */}
        <div className="bg-[#1e293b] p-6 rounded-xl">
          <p>Email: user@gmail.com</p>
          <p>Theme: Dark Mode 🌙</p>
        </div>

        {/* CHANGE PASSWORD */}
        <ChangePassword />

      </div>
    </div>
  );
};

export default Settings;