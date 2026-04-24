export default function ExpenseModal({ form, setForm, handleAdd, editId }) {
  return (
    <div className="glass" style={{ marginBottom: 20 }}>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e)=>setForm({...form,title:e.target.value})}
      />

      <input
       type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e)=>setForm({...form,amount:e.target.value})}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e)=>setForm({...form,category:e.target.value})}
      />

      <button onClick={handleAdd}>
        {editId ? "Update" : "Add"}
      </button>
    </div>
  );
}