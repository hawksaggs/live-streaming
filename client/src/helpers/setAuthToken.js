import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

export const isLoggedIn = () => {
  return (
    localStorage.getItem("token") !== null &&
    localStorage.getItem("token") !== undefined
  );
};

export const getUserId = () => {
  if (isLoggedIn()) return localStorage.getItem("userId");
};
