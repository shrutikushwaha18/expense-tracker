import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "https://expense-tracker-akan.onrender.com/api/auth/change-password",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      setForm({ oldPassword: "", newPassword: "" });

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="bg-[#1e293b] p-6 rounded-xl shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-4 text-white">🔐 Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded">
          Update Password
        </button>

      </form>
    </div>
  );
};

export default ChangePassword;