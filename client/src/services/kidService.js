import axios from "axios";

// FULL backend URL — this is the fix
const API_URL = "https://momlifeorganizer.onrender.com/api/kids";

export const getKids = async () => {
  try {
    const res = await axios.get(API_URL);
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("Error fetching kids:", error);
    return [];
  }
};

export const createKid = async (kidData) => {
  try {
    const res = await axios.post(API_URL, kidData);
    return res.data;
  } catch (error) {
    console.error("Error creating kid:", error);
    throw error;
  }
};

export const updateKid = async (id, kidData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, kidData);
    return res.data;
  } catch (error) {
    console.error("Error updating kid:", error);
    throw error;
  }
};

export const deleteKid = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting kid:", error);
    throw error;
  }
};



