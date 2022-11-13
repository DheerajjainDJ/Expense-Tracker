import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Avatar,
  Stack,
  Alert,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "90vh",
    width: "90vw",
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
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await axios.post(
        `http://localhost:5000/user/forgotPasswordReset/${param.id}`,
        { password: password }
      );
      setMessage(response.data.message);
      navigate("/auth/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const isValidate = (value) => {
    if (value.length < 9) {
      return true;
    } else return false;
  };

  const handleShowPassword = () => {
    setPasswordShow(!passwordShow);
  };

  return (
    <Box className={classes.container}>
      <Paper square className={classes.paper}>
        <Avatar className={classes.Avatar}>
          <LockOpenIcon size="large" />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          Password Reset
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
              label="Enter New Password"
              value={password}
              color={password && isValidate(password) && "error"}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordShow ? "text" : "password"}
              required
              helperText={
                password &&
                isValidate(password) && (
                  <span style={{ fontSize: "13px", color: "red" }}>
                    Password should be greater than 8 characters
                  </span>
                )
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      sx={{ color: "black" }}
                    >
                      {passwordShow ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              disabled={!password}
              sx={{ backgroundColor: "teal" }}
              type="submit"
            >
              submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
