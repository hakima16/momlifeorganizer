import axios from "axios";

const API_URL = "https://momlifeorganizer.onrender.com/api/shopping";

export const getItems = async () => {
  const res = await axios.get(API_URL);
  return Array.isArray(res.data) ? res.data : [];
};

export const createItem = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateItem = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteItem = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

