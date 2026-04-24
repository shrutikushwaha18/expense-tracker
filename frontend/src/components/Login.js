import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
  input:hover {
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
  }
  button:hover {
    background: #7c3aed !important;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3) !important;
  }
`;
document.head.appendChild(styleSheet);

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "http://localhost:5000";

  // ✅ FIXED WARNING (navigate added)
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // ✅ HANDLE LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });

      // ✅ SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // ✅ REDIRECT
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔐 Login</h2>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <p style={styles.paragraph}>
        Don't have an account?{" "}
        <Link to="/signup" style={styles.link}>
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;

// ✅ SIMPLE CLEAN UI
const styles = {
  title: {
    fontSize: "2.5rem",
    marginBottom: "30px",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
    animation: "slideUp 0.5s ease-out",
  },
  container: {
    width: "100%",
    minHeight: "100vh",
    margin: "0",
    textAlign: "center",
    padding: "20px",
    background: "linear-gradient(135deg, #c69fdb 0%, #6cdcf2 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "350px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(15px)",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    animation: "slideUp 0.5s ease-out",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    border: "none",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.9)",
    color: "#333",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "15px",
    transition: "all 0.3s",
    boxSizing: "border-box",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "all 0.3s",
  },
  paragraph: {
    marginTop: "25px",
    fontSize: "1rem",
    color: "rgba(255, 255, 255, 0.9)",
    animation: "slideUp 0.6s ease-out",
  },
};