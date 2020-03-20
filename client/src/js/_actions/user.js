import {
  GET_USER,
  SHOW_USER,
  UPDATE_USER,
  DELETE_USER
} from "../config/constant";

import { API, setToken } from "../config/api";

export const getUser = () => {
  return {
    type: GET_USER,
    payload: async () => {
      setToken();
      const res = await API.get("/auth");
      const { data } = res.data;
      console.log(data);
      return data;
    }
  };
};
