const router = require("express").Router();
const Expense = require("../models/expense");
const { protect } = require("../middleware/auth");

// GET
router.get("/", protect, async (req, res) => {
  const data = await Expense.find({ userId: req.user.id });
  res.json(data);
});

// ADD
router.post("/", protect, async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    userId: req.user.id,
  });
  res.json(expense);
});

// DELETE
router.delete("/:id", protect, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// UPDATE
router.put("/:id", protect, async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

module.exports = router;