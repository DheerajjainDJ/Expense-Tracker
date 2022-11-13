import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackbarComp({
  open,
  setOpen,
  signupOpen,
  setSignupOpen,
}) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setSignupOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          New Transaction Added!
        </Alert>
      </Snackbar>
      <Snackbar
        open={signupOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" onClose={handleClose} severity="success">
          Successfully Signed Up! Please LogIn To Continue
        </Alert>
      </Snackbar>
    </div>
  );
}
