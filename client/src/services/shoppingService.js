import axios from "axios";

const API_URL = "http://localhost:5000/api/shopping";

export const getShoppingItems = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createShoppingItem = async (itemData) => {
  const res = await axios.post(API_URL, itemData);
  return res.data;
};

export const updateShoppingItem = async (id, itemData) => {
  const res = await axios.put(`${API_URL}/${id}`, itemData);
  return res.data;
};

export const deleteShoppingItem = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

