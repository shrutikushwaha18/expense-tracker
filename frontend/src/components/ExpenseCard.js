import { motion } from "framer-motion";

export default function ExpenseCard({ e, handleEdit, handleDelete }) {
  return (
    <motion.div
      className="glass"
      style={{ marginTop: 10, padding: 10 }}
      whileHover={{ scale: 1.05 }}
    >
      <strong>{e.title}</strong> - ₹{e.amount}
      <br />
      <small>{e.category}</small>

      <div>
        <button onClick={() => handleEdit(e)}>✏</button>
        <button onClick={() => handleDelete(e._id)}>❌</button>
      </div>
    </motion.div>
  );
}