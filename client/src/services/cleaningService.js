import axios from "axios";

const API_URL = "http://localhost:5000/api/cleaning";

export const getCleaningTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createCleaningTask = async (taskData) => {
  const res = await axios.post(API_URL, taskData);
  return res.data;
};

export const deleteCleaningTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
