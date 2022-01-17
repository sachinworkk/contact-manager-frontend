import axios from "axios";
import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:8081/user/login";

export const login = (loginInfo) => {
  return axios.post(API_URL, loginInfo).then((res) => {
    if (res.data.token) {
      localStorage.setItem("key", JSON.stringify(res.data));
    }
    return res.data;
  });
};

/**
 * Get the logged in user mapped to the jwt.
 *
 */
export const getLoggedInUser = () => {
  if (!localStorage.getItem("key")) {
    return false;
  }

  const { token } = JSON.parse(localStorage.getItem("key"));

  const content = jwt_decode(token);

  return content;
};

export const logOut = () => {
  localStorage.removeItem("key");
};
