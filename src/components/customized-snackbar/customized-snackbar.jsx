import React from "react";
// import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../redux/snackbar/snackbar-actions";
import { Alert, Box } from "@mui/material";
import { Snackbar } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

const CustomizedSnackbar = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarOpen = useSelector((state) => state.snackbar.snackbarOpen);
  const snackbarType = useSelector((state) => state.snackbar.snackbarType);
  const snackbarMessage = useSelector(
    (state) => state.snackbar.snackbarMessage
  );
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };

  return (
    <Box
      sx={{
        width: "100%",
        "& > * + *": {
          mt: 2, // marginTop: theme.spacing(2) == 2 * 8px = 16px
        },
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomizedSnackbar;
