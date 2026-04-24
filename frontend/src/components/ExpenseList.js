import React, { useEffect, useState } from "react";
import axios from "axios";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://expense-tracker-akan.onrender.com/expenses",
      {
        headers: { Authorization: token },
      }
    );

    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>My Expenses</h1>

      <button onClick={handleLogout}>Logout</button>

      {expenses.map((e) => (
        <div key={e._id} style={{
          background: "white",
          color: "black",
          margin: "10px",
          padding: "10px",
          borderRadius: "10px"
        }}>
          <h3>{e.title}</h3>
          <p>₹ {e.amount}</p>
        </div>
      ))}
    </div>
  );
}


export default ExpenseList;