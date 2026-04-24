export default function Navbar({ dark, setDark }) {
  return (
    <div className="glass" style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      marginBottom: "10px"
    }}>
      <h3>📊 Dashboard</h3>

      <button onClick={() => setDark(!dark)}>
        {dark ? "☀ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}