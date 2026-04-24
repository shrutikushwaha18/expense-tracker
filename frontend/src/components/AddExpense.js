import React, { useState } from "react";
import { addExpense } from "../services/api";

const AddExpense = ({ setReload }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense({ title, amount, category });
    setTitle("");
    setAmount("");
    setCategory("");
    setReload(prev => !prev);
  };

  return (
    <>
      <h2 className="section-title">Add Expense</h2>

      <form className="add-expense-form" onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <button>Add</button>
      </form>
    </>
  );
};

export default AddExpense;
