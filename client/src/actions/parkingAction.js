import {
  allocateParkingApi,
  deallocateParkingApi,
  getLotApi,
  getLotsApi,
} from "../api/parkingApi";
import { GET_LOT, GET_LOTS, SET_DIALOG, SET_SNACKBAR } from "../types";

export const getLotsAction = () => async (dispatch) => {
  try {
    const res = await getLotsApi();

    console.log(res, "from res");

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_LOTS, payload: res.data });
  } catch (error) {
    console.log(error, "get lots action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getLotAction = (payload) => async (dispatch) => {
  try {
    const res = await getLotApi(payload);

    console.log(res, "from res");

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({
      type: GET_LOT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error, "get lots action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const allocateParkingAction = (payload) => async (dispatch) => {
  try {
    const res = await allocateParkingApi(payload);

    console.log(res, "from res");

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update lot state
    await dispatch(getLotAction({ lotId: payload.lotId }));

    // close dialoag
    await dispatch({
      type: SET_DIALOG,
      payload: null,
    });
  } catch (error) {
    console.log(error, "get lots action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const deallocateParkingAction = (payload) => async (dispatch) => {
  try {
    console.log(payload, "from action");
    const res = await deallocateParkingApi(payload);

    console.log(res, "from res");

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // close dialoag
    await dispatch({
      type: SET_DIALOG,
      payload: null,
    });
  } catch (error) {
    console.log(error, "get lots action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};
