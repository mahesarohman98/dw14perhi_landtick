import {
  UPDATE_IDENTITY,
  GET_IDENTITY,
  SET_IDENTITY_ID
} from "../config/constant";

const initialState = {
  data: {},
  id: null,
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_IDENTITY}_PENDING`:
    case `${UPDATE_IDENTITY}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_IDENTITY}_FULFILLED`:
      if (action.payload.listId != null) {
        action.payload.listId = action.payload.listId.split(",");
      } else {
        action.payload.listId = [];
      }
      if (action.payload.listTandaPengenal != null) {
        action.payload.listTandaPengenal = action.payload.listTandaPengenal.split(
          ","
        );
      } else {
        action.payload.listTandaPengenal = [];
      }
      if (action.payload.listNama != null) {
        action.payload.listNama = action.payload.listNama.split(",");
      } else {
        action.payload.listNama = [];
      }
      if (action.payload.listNoHp != null) {
        action.payload.listNoHp = action.payload.listNoHp.split(",");
      } else {
        action.payload.listNoHp = [];
      }
      if (action.payload.listEmail != null) {
        action.payload.listEmail = action.payload.listEmail.split(",");
      } else {
        action.payload.listEmail = [];
      }
      console.log(action.payload, "dddddcccccccccccccccccccccc");

    case `${UPDATE_IDENTITY}_FULFILLED`:
      return {
        ...state,
        data: action.payload,
        loading: false
      };
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true
      };
    case `${GET_IDENTITY}_PENDING`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true
      };
    case `${GET_IDENTITY}_PENDING`:
    case `${GET_IDENTITY}_REJECTED`:
    case `${UPDATE_IDENTITY}_REJECTED`:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: true
      };
    case SET_IDENTITY_ID:
      return {
        ...state,
        id: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
