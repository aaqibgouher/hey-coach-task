import { GET_LOT, GET_LOTS } from "../types";

const initialState = {
  lots: [],
  lot: null,
};

const parkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOTS:
      return {
        ...state,
        lots: action.payload,
      };
    case GET_LOT:
      return {
        ...state,
        lot: action.payload,
      };
    default:
      return state;
  }
};

export default parkingReducer;
