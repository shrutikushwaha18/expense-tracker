import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// ✅ attach token (if using login)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


// ✅ GET
export const getExpenses = () => {
  return API.get("/expenses");
};

// ✅ ADD
export const addExpense = (data) => {
  return API.post("/expenses", data);
};

// ✅ DELETE
export const deleteExpense = (id) => {
  return API.delete(`/expenses/${id}`);
};

// ✅ UPDATE
export const updateExpense = (id, data) => {
  return API.put(`/expenses/${id}`, data);
};