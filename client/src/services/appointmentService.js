import axios from "axios";

const API_URL = "https://momlifeorganizer.onrender.com/api/appointments";

export const getAppointments = async () => {
  const res = await axios.get(API_URL);
  return Array.isArray(res.data) ? res.data : [];
};

export const createAppointment = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateAppointment = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteAppointment = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
