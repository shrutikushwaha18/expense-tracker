import axios from "axios";

const BASE_URL = "https://expense-tracker-akan.onrender.com";

// ✅ ADD EXPENSE
export const addExpense = async (expense) => {
  const response = await axios.post(
    `${BASE_URL}/expenses/add`,
    expense
  );
  return response.data;
};

// ✅ GET EXPENSES (user-wise)
export const getExpenses = async () => {
  const userId = localStorage.getItem("userId");

  const response = await axios.get(
    `${BASE_URL}/expenses?userId=${userId}`
  );
  return response.data;
};

// ✅ UPDATE EXPENSE ✏️
export const updateExpense = async (id, updatedData) => {
  const response = await axios.put(
    `${BASE_URL}/expenses/update/${id}`,
    updatedData
  );
  return response.data;
};

// ✅ DELETE EXPENSE 🗑️
export const deleteExpense = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/expenses/delete/${id}`
  );
  return response.data;
};

import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-akan.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;