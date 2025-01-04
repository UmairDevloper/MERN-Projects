import { getUserToken } from "../../utils/token";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

const token = getUserToken();

// login route
export const loginAPI = async ({ email, password }) => {
  const res = await axios.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return res.data;
};

// login route
export const registerAPI = async ({ email, username, password }) => {
  const res = await axios.post(`${BASE_URL}/register`, {
    email,
    username,
    password,
  });
  return res.data;
};

// Update Password
export const updatePasswordAPI = async (newPassword) => {
  const res = await axios.put(
    `${BASE_URL}/change-password`,
    {
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// Update Profile
export const updateProfileAPI = async ({ username, email }) => {
  const res = await axios.put(
    `${BASE_URL}/update-profile`,
    {
      username,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
