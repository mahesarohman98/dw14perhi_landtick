import {
  POST_ORDER,
  GET_ORDERS,
  UPLOAD_PAYMENT,
  GET_ALL_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER
} from "../config/constant";

const initialState = {
  data: [],
  identity: [],
  upload: "",
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${DELETE_ORDER}_PENDING`:
    case `${UPDATE_ORDER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${DELETE_ORDER}_FULFILLED`:
    case `${UPDATE_ORDER}_FULFILLED`:
      return {
        ...state,
        loading: false
      };
    case `${DELETE_ORDER}_REJECTED`:
    case `${UPDATE_ORDER}_REJECTED`:
      return {
        ...state,
        error: true
      };
    case `${POST_ORDER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_ORDERS}_PENDING`:
    case `${GET_ALL_ORDER}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${POST_ORDER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        quantity: 1,
        loading: false
      };
    case `${GET_ALL_ORDER}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case `${GET_ORDERS}_FULFILLED`:
      action.payload.map((item, index) => {
        if (item.listId != null) {
          item.listId = item.listId.split(",");
        } else {
          item.listId = [];
        }
        if (item.listTandaPengenal != null) {
          item.listTandaPengenal = item.listTandaPengenal.split(",");
        } else {
          item.listTandaPengenal = [];
        }
        if (item.listNama != null) {
          item.listNama = item.listNama.split(",");
        } else {
          item.listNama = [];
        }
        if (item.listNoHp != null) {
          item.listNoHp = item.listNoHp.split(",");
        } else {
          item.listNoHp = [];
        }
        if (item.listEmail != null) {
          item.listEmail = item.listEmail.split(",");
        } else {
          item.listEmail = [];
        }
      });
      return {
        ...state,
        identity: action.payload,
        loading: false
      };
    case `${POST_ORDER}_REJECTED`:
    case `${GET_ALL_ORDER}_REJECTED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true
      };
    case `${GET_ORDERS}_REJECTED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true
      };
    case `${UPLOAD_PAYMENT}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${UPLOAD_PAYMENT}_FULFILLED`:
      return {
        ...state,
        upload: action.payload,
        loading: false
      };
    case `${UPLOAD_PAYMENT}_REJECTED`:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
