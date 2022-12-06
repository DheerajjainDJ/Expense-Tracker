import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Avatar,
  Stack,
  Alert,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "90vh",
    width: "95vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  paper: {
    width: "300px",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Avatar: {
    padding: "6px",
    margin: "10px",
    backgroundColor: "teal",
  },
}));
const ForgotPassword = () => {
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await axios.post(
        "https://mern-expense-tracker-webapp.up.railway.app/user/forgotPasswordlink",
        { email: emailValue }
      );
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const isValidate = (email) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
  };
  return (
    <Box className={classes.container}>
      <Paper square className={classes.paper}>
        <Avatar className={classes.Avatar}>
          <LockOpenIcon size="large" />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          Forget Password
        </Typography>
        <form
          style={{ width: "100%", marginTop: "10px" }}
          noValidate
          autoComplete={false}
          onSubmit={handleSubmit}
        >
          <Stack spacing={3}>
            {message && (
              <Alert severity="success" variant="filled">
                {message}
              </Alert>
            )}
            {error && (
              <Alert severity="error" variant="filled">
                {error}
              </Alert>
            )}
            <TextField
              label="Enter Email"
              value={emailValue}
              color={emailValue && !isValidate(emailValue) && "error"}
              onChange={(e) => setEmailValue(e.target.value)}
              type="email"
              required
              helperText={
                emailValue &&
                !isValidate(emailValue) && (
                  <span style={{ fontSize: "15px", color: "red" }}>
                    Invalid Email Address
                  </span>
                )
              }
            />
            <Button
              variant="contained"
              disabled={!emailValue}
              sx={{ backgroundColor: "teal" }}
              type="submit"
            >
              Reset password
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
