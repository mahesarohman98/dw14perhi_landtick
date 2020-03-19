import {
  UPDATE_IDENTITY,
  GET_IDENTITY,
  SET_IDENTITY_ID
} from "../config/constant";

import { API, setToken } from "../config/api";

export const updateIdentity = resdata => {
  return {
    type: UPDATE_IDENTITY,
    payload: async () => {
      setToken();
      const res = await API.put("/myorders", resdata);
      const { data } = res.data;
      return data;
    }
  };
};

export const getIdentity = id => {
  return {
    type: GET_IDENTITY,
    payload: async () => {
      setToken();
      const res = await API.get(`/myorder/${id}`);
      const { data } = res.data;
      return data;
    }
  };
};

export const setIdentityId = id => {
  return {
    type: SET_IDENTITY_ID,
    payload: id
  };
};
