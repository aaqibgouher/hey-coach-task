import { SET_DIALOG, SET_SNACKBAR } from "../types";

const initialState = {
  snackbar: null,
  dialog: null,
};

const helperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    case SET_DIALOG:
      return {
        ...state,
        dialog: action.payload,
      };
    default:
      return state;
  }
};

export default helperReducer;
