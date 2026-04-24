import React, { useEffect, useState } from "react";
import { addExpense, getExpenses } from "../api/expenseApi";

function ExpenseTracker() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [reload, setReload] = useState(false);

  // FETCH EXPENSES
  useEffect(() => {
    getExpenses().then((data) => {
      setExpenses(data);
    });
  }, [reload]);

  // ADD EXPENSE
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addExpense({
      title,
      amount,
      category,
    });

    setTitle("");
    setAmount("");
    setCategory("");
    setReload(!reload); // refresh list
  };

  return (
    <div>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button type="submit">Add</button>
      </form>

      <h2>Expense List</h2>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.title} - ₹{exp.amount} ({exp.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;
