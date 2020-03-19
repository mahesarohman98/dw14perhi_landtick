import { AUTH_LOGIN, AUTH_REGISTER } from "../config/constant";
import { API } from "../config/api";

export const postLogin = value => {
  const { email, password } = value;
  return {
    type: AUTH_LOGIN,
    payload: async user => {
      const res = await API.post("auth/login", {
        email,
        password
      });
      const { data } = res.data;
      if (data.token != null) {
        localStorage.setItem("token", data.token);
      }
      return data;
    }
  };
};

export const postRegister = value => {
  const { name, email, password, gender, address, phone } = value;
  return {
    type: AUTH_REGISTER,
    payload: async () => {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        gender,
        address,
        phone
      });
      const { data } = res.data;
      if (data.token != null) {
        localStorage.setItem("token", data.token);
      }
      return data;
    }
  };
};
