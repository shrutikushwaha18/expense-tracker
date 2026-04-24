import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

// ✅ ADD ANIMATION STYLES
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .card {
    animation: slideUp 0.5s ease-out;
  }
`;
document.head.appendChild(styleSheet);

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/register",
        form
      );

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>✨ Signup</h2>

        {error && <p style={{ color: "#ff6b6b", marginBottom: "15px" }}>{error}</p>}

        <input 
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setForm({...form, name: e.target.value})} 
        />

        <input 
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setForm({...form, email: e.target.value})} 
        />

        <input 
          type="password" 
          placeholder="Enter Password"
          onChange={(e) => setForm({...form, password: e.target.value})} 
        />

        <button onClick={handleSignup}>Signup</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;