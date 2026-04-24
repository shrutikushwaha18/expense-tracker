import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDarkMode } from "../context/DarkModeContext";

// ✅ ADD GLOBAL ANIMATIONS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes shimmer {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  * {
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Hover Effects */
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
  }

  input:focus {
    transform: scale(1.02);
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.5) !important;
  }
`;
document.head.appendChild(styleSheet);

const Dashboard = () => {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const API = "http://localhost:5000"; // ✅ FIXED

  // ✅ FETCH DATA
  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched:", res.data); // DEBUG
      setExpenses(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.log("Fetch Error:", err.response?.data || err.message);
    }
  }, []);

  // ✅ CALCULATE TOTAL
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ ADD EXPENSE
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("Token:", token); // DEBUG

    try {
      const res = await axios.post(
        `${API}/expenses`,
        { title, amount, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Added:", res.data); // DEBUG

      setTitle("");
      setAmount("");
      setCategory("");

      fetchData(); // refresh list
    } catch (err) {
      console.log("Add Error:", err.response?.data || err.message);
      alert("Failed to add expense: " + (err.response?.data?.message || err.message));
    }
  };

  // ✅ DELETE EXPENSE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchData();
    } catch (err) {
      console.log("Delete Error:", err.response?.data || err.message);
    }
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={getStyles(isDark).container}>
      <div style={getStyles(isDark).header}>
        <h2 style={getStyles(isDark).title}>💰 Expense Dashboard</h2>
        <div style={getStyles(isDark).buttonGroup}>
          <button 
            onClick={toggleDarkMode} 
            style={getStyles(isDark).darkModeBtn}
            title="Toggle Dark Mode"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button onClick={handleLogout} style={getStyles(isDark).logout}>
            Logout
          </button>
        </div>
      </div>

      <div style={getStyles(isDark).total}>
        <h3>Total Expenses: ₹{totalAmount}</h3>
      </div>

      <form onSubmit={handleAdd} style={getStyles(isDark).form}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={getStyles(isDark).input}
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={getStyles(isDark).input}
        />

        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={getStyles(isDark).input}
        />

        <button type="submit" style={getStyles(isDark).addBtn}>
          Add Expense
        </button>
      </form>

      <div style={getStyles(isDark).list}>
        {expenses.length === 0 ? (
          <p style={getStyles(isDark).emptyText}>No expenses found</p>
        ) : (
          expenses.map((exp) => (
            <div key={exp._id} style={getStyles(isDark).card}>
              <div style={getStyles(isDark).expenseInfo}>
                <span style={getStyles(isDark).expenseTitle}>{exp.title} - ₹{exp.amount}</span>
              </div>
              <button
                onClick={() => handleDelete(exp._id)}
                style={getStyles(isDark).deleteBtn}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

// ✅ DYNAMIC STYLES WITH DARK MODE & ANIMATIONS
const getStyles = (isDark) => ({
  container: {
    padding: "20px",
    width: "100vw",
    margin: "0",
    textAlign: "center",
    background: isDark 
      ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" 
      : "linear-gradient(135deg, #c69fdb 0%, #6cdcf2 100%)",
    minHeight: "100vh",
    color: isDark ? "#e0e0e0" : "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",
    animation: "fadeIn 0.5s ease-out",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    width: "100%",
    maxWidth: "900px",
    animation: "slideUp 0.6s ease-out",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  title: {
    margin: "0",
    fontSize: "2.5rem",
    textShadow: isDark 
      ? "2px 2px 4px rgba(255,255,255,0.2)" 
      : "2px 2px 4px rgba(0,0,0,0.3)",
    animation: "slideUp 0.6s ease-out",
  },
  darkModeBtn: {
    background: isDark 
      ? "rgba(255, 255, 255, 0.1)" 
      : "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    padding: "10px 15px",
    border: `2px solid ${isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.3)"}`,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1.2rem",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    transform: "scale(1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45px",
    height: "45px",
  },
  logout: {
    background: isDark 
      ? "rgba(255, 69, 0, 0.3)" 
      : "rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "1rem",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    fontWeight: "bold",
  },
  total: {
    background: isDark 
      ? "rgba(255, 255, 255, 0.05)" 
      : "rgba(255,255,255,0.1)",
    padding: "25px",
    borderRadius: "15px",
    margin: "20px 0",
    fontSize: "1.5rem",
    fontWeight: "bold",
    boxShadow: isDark 
      ? "0 4px 15px rgba(0,0,0,0.5)" 
      : "0 4px 15px rgba(0,0,0,0.2)",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"}`,
    animation: "scaleIn 0.6s ease-out 0.1s both",
  },
  form: {
    background: isDark 
      ? "rgba(255, 255, 255, 0.05)" 
      : "rgba(255,255,255,0.1)",
    padding: "30px",
    borderRadius: "15px",
    margin: "20px 0",
    backdropFilter: "blur(10px)",
    boxShadow: isDark 
      ? "0 4px 15px rgba(0,0,0,0.5)" 
      : "0 4px 15px rgba(0,0,0,0.2)",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"}`,
    animation: "scaleIn 0.6s ease-out 0.2s both",
    maxWidth: "900px",
  },
  input: {
    padding: "12px",
    margin: "10px",
    width: "calc(50% - 20px)",
    border: "none",
    borderRadius: "25px",
    fontSize: "1rem",
    outline: "none",
    background: isDark 
      ? "#2a2a3e" 
      : "rgba(255,255,255,0.9)",
    color: isDark ? "#e0e0e0" : "#333",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  addBtn: {
    padding: "12px 30px",
    background: isDark 
      ? "linear-gradient(45deg, #ff6b6b, #ee5a6f)" 
      : "linear-gradient(45deg, #4CAF50, #45a049)",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: isDark 
      ? "0 4px 15px rgba(255, 107, 107, 0.4)" 
      : "0 4px 15px rgba(76,175,80,0.4)",
  },
  list: {
    marginTop: "30px",
    maxWidth: "900px",
    animation: "slideUp 0.7s ease-out 0.3s both",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: isDark 
      ? "rgba(255, 255, 255, 0.08)" 
      : "rgba(255,255,255,0.15)",
    padding: "15px 20px",
    margin: "10px 0",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"}`,
    transition: "all 0.3s ease",
    animation: "slideUp 0.4s ease-out",
  },
  expenseInfo: {
    flex: "1",
    textAlign: "left",
  },
  expenseTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: isDark ? "#fff" : "#fff",
  },
  deleteBtn: {
    background: isDark 
      ? "rgba(255, 69, 0, 0.5)" 
      : "rgba(255, 69, 0, 0.3)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 15px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
    marginLeft: "10px",
    fontWeight: "bold",
  },
  emptyText: {
    color: isDark ? "#aaa" : "#fff",
    fontSize: "1.2rem",
    animation: "fadeIn 0.5s ease-out",
  },
});