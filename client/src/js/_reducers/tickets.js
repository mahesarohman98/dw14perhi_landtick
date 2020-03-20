import {
  GET_TICKET,
  FIND_TICKET,
  UPDATE_QUANTITY,
  GET_STATIONS
} from "../config/constant";

const initialState = {
  data: [],
  stations: [],
  quantity: 1,
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_STATIONS}_PENDING`:
    case `${GET_TICKET}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_STATIONS}_FULFILLED`:
      return {
        ...state,
        stations: action.payload,
        loading: false
      };
    case `${GET_TICKET}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        quantity: 1,
        loading: false
      };
    case `${GET_STATIONS}_FULFILLED`:
    case `${GET_TICKET}_REJECTED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true
      }; //ddd
    case `${FIND_TICKET}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${FIND_TICKET}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${FIND_TICKET}_REJECTED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        quantity: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
