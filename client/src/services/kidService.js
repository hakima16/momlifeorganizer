import axios from "axios";

const API_URL = "/api/kids";

export const getKids = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createKid = async (kidData) => {
  const res = await axios.post(API_URL, kidData);
  return res.data;
};

export const updateKid = async (id, kidData) => {
  const res = await axios.put(`${API_URL}/${id}`, kidData);
  return res.data;
};

export const deleteKid = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};


