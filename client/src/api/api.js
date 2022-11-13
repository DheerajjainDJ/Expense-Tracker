import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signup = (formData) => API.post("/user/signup", formData);

export const login = (formData) => API.post("/user/login", formData);

export const logout = () => {
  API.post("/user/logout");
};

export const addTransaction = (transactionData) =>
  API.post("/user/transaction", transactionData);

export const getTransaction = () => API.get("/user/transaction");

export const deleteTransaction = (id) => API.delete(`/user/transaction/${id}`);
