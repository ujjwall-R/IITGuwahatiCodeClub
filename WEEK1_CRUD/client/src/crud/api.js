import axios from "axios";

export const getTasks = async () => {
  return await axios.get(`${process.env.REACT_APP_API}`);
};

export const createTask = async (task) => {
  return await axios.post(`${process.env.REACT_APP_API}`, task);
};

export const getTask = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/${id}`);
};

export const removeTask = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_API}/${id}`);
};

export const updateTask = async (id, task) => {
  return await axios.put(`${process.env.REACT_APP_API}/${id}`, task);
};
