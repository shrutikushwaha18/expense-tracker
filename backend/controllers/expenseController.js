const Expense = require("../models/expense");

// ✅ ADD
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, userId } = req.body;

    const expense = new Expense({
      title,
      amount,
      category,
      userId
    });

    await expense.save();
    res.status(201).json(expense);

  } catch (err) {
    console.error("Add Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET
const getExpenses = async (req, res) => {
  try {
    const userId = req.query.userId;

const expenses = await Expense.find({ userId: req.query.userId });
    res.json(expenses);

  } catch (err) {
    console.error("Get Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(updatedExpense);

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE
const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;

    await Expense.findByIdAndDelete(id);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ ONLY ONE EXPORT
module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};