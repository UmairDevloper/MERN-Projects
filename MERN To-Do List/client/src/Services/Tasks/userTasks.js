import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserToken } from "../../utils/token";

const token = getUserToken();

// add task
export const addTaskAPI = async ({ title, description, status, date }) => {
  const res = await axios.post(
    `${BASE_URL}/create`,
    {
      title,
      description,
      status,
      date,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// list task
export const listTaskAPI = async () => {
  const res = await axios.get(`${BASE_URL}/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// delete task
export const deleteTaskAPI = async (id) => {
  const res = await axios.delete(`${BASE_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// update task
export const updateTaskAPI = async ({
  title,
  description,
  status,
  date,
  id,
}) => {
  const res = await axios.put(
    `${BASE_URL}/update/${id}`,
    {
      title,
      description,
      status,
      date,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
