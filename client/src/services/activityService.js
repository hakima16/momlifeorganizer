import axios from "axios";

const API_URL = "/api/activities";

export const getActivities = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createActivity = async (activity) => {
  const res = await axios.post(API_URL, activity);
  return res.data;
};

export const updateActivity = async (id, activity) => {
  const res = await axios.put(`${API_URL}/${id}`, activity);
  return res.data;
};

export const deleteActivity = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
