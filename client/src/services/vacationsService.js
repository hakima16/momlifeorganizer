import axios from "axios";

const API_URL = "http://localhost:5000/api/vacations";

export const getVacations = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createVacation = async (vacationData) => {
  const res = await axios.post(API_URL, vacationData);
  return res.data;
};

export const deleteVacation = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
