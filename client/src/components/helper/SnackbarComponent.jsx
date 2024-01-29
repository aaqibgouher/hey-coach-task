import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import { SET_SNACKBAR } from "../../types";

const SnackbarComponent = () => {
  const snackbarState = useSelector((state) => state.helperReducer.snackbar);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch({ type: SET_SNACKBAR, payload: null });
  }, 5000);

  return (
    <>
      <Snackbar
        open={snackbarState?.open}
        message={snackbarState?.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </>
  );
};

export default SnackbarComponent;
