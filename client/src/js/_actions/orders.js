import {
  POST_ORDER,
  GET_ORDERS,
  GET_ORDER_ID,
  UPLOAD_PAYMENT,
  GET_ALL_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
} from "../config/constant";

import { API, setToken } from "../config/api";

export const postOrder = data => {
  const { trainId, quantity } = data;
  return {
    type: POST_ORDER,
    payload: async () => {
      setToken();
      const res = await API.post("/order", {
        trainId,
        quantity
      });
      const { data } = res.data;
      return data;
    }
  };
};

export const updateOrder = (id, status) => {
  return {
    type: UPDATE_ORDER,
    payload: async () => {
      setToken();
      const res = await API.put(`/order/${id}`, {
        status
      });
      const { data } = res.data;
      return data;
    }
  };
};

export const deleteOrder = id => {
  return {
    type: DELETE_ORDER,
    payload: async () => {
      setToken();
      const res = await API.delete(`/order/${id}`);
    }
  };
};

export const getOrders = () => {
  return {
    type: GET_ORDERS,
    payload: async () => {
      setToken();
      const res = await API.get("/myorders");
      const { data } = res.data;
      return data;
    }
  };
};

export const getAllOrders = () => {
  return {
    type: GET_ALL_ORDER,
    payload: async () => {
      setToken();
      const res = await API.get("/orders");
      const { data } = res.data;
      return data;
    }
  };
};

export const getOrderId = orderId => {
  return {
    type: GET_ORDER_ID,
    payload: async () => {
      setToken();
      const res = await API.get(`myorder/${orderId}`);
      const { data } = res.data;
      data.listTandaPengenal = data.listTandaPengenal.split(
        data.listTandaPengenal
      );
      return data;
    }
  };
};

export const uploadPayment = formData => {
  return {
    type: UPLOAD_PAYMENT,
    payload: async () => {
      setToken();
      const res = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { data } = res.data;
      return data;
    }
  };
};
