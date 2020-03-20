import { AUTH_LOGIN, AUTH_REGISTER } from "../config/constant";

const initialState = {
  data: [],
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${AUTH_LOGIN}_PENDING`:
    case `${AUTH_REGISTER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${AUTH_LOGIN}_FULFILLED`:
    case `${AUTH_REGISTER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${AUTH_LOGIN}_REJECTED`:
    case `${AUTH_REGISTER}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
