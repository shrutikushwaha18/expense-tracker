import React, { useState } from "react";
import "./Auth.css";
const jwt = require("jsonwebtoken");

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

  const handleSubmit = () => {
    if (!form.username || !form.password) {
      return alert("Fill all fields");
    }

    // 🔥 TEMP LOGIN (later connect backend)
    localStorage.setItem("userId", form.username);
    setUser(form.username);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>✨ {isLogin ? "Login" : "Signup"}</h2>

        <div className="toggle">
          <span
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </span>
          <span
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </span>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={handleSubmit}>
          {isLogin ? "Login" : "Signup"}
        </button>
      </div>
    </div>
  );
}

export default Auth;