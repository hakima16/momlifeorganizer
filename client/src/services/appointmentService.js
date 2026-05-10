import axios from "axios";

const API_URL = "http://localhost:5000/api/appointments";

export const getAppointments = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createAppointment = async (appointmentData) => {
  const res = await axios.post(API_URL, appointmentData);
  return res.data;
};

export const deleteAppointment = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
