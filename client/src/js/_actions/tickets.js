import {
  GET_TICKET,
  FIND_TICKET,
  UPDATE_QUANTITY,
  GET_STATIONS
} from "../config/constant";
import { API } from "../config/api";
import moment from "moment";

export const findTickets = value => {
  const { startStation, destinationStation, dateStart, quantity } = value;
  return {
    type: FIND_TICKET,
    payload: async () => {
      const res = await API.post("/findtickets", {
        startStation,
        destinationStation,
        dateStart,
        quantity
      });
      const { data } = res.data;
      console.log(res.data);
      return data;
    }
  };
};
export const updateQuantity = value => {
  const { quantity } = value;
  return {
    type: UPDATE_QUANTITY,
    payload: quantity
  };
};

export const getTicket = () => {
  let dateNow = moment().format("YYYY-MM-DD");
  console.log(dateNow);
  return {
    type: GET_TICKET,
    payload: async () => {
      const res = await API.get(`/tickets?startTime=&dateStart=${dateNow}`);
      const { data } = res.data;
      console.log(res.data);
      return data;
    }
  };
};

export const getStations = () => {
  return {
    type: GET_STATIONS,
    payload: async () => {
      const res = await API.get("/station");
      const { data } = res.data;
      return data;
    }
  };
};

// export const findTickets = () => {
// const { startStation, destinationStation, dateStart, quantity } = value;
// console.log("ddddddddddddddddddddd", dateStart);
// return {
//   type: FIND_TICKET,
//   payload: async () => {
// const res = await API.get("/findtickets", {
//   startStation,
//   destinationStation,
//   dateStart,
//   quantity
// });
// const { data } = res.data;
// console.log(res.data);
// return data;
//   }
// };
// };
