import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { teal } from "@mui/material/colors";
import { signup } from "../../../api/api";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import InputComp from "./InputComp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useStyles } from "./signUpStyles";
import SnackbarComp from "../../snackbar/SnackbarComp";

const SignUp = () => {
  const signUpInitialValue = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const signupErrorValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const classes = useStyles();
  const [signupValues, setSignupValues] = useState(signUpInitialValue);
  const [passStatus, setPassStatus] = useState(false);
  const [signupError, setSignupError] = useState(signupErrorValues);
  const [signupOpen, setSignupOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupValues({ ...signupValues, [name]: value });
  };

  const handleShowPassword = () => {
    setPassStatus(!passStatus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupError(signupErrorValues);
    try {
      await signup(signupValues);
      navigate("/auth/login");
    } catch (error) {
      error.response.data &&
        setSignupError({
          ...signupError,
          [Object.keys(error.response.data)]: Object.values(
            error.response.data
          ),
        });
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper square className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon size="large" />
        </Avatar>
        <Typography variant="h6" gutterBottom>
          SignUp
        </Typography>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <InputComp
              name="firstname"
              label="First Name"
              value={signupValues.firstname}
              handleChange={handleChange}
              error={signupError}
            />
            <InputComp
              name="lastname"
              label="Last Name"
              value={signupValues.lastname}
              handleChange={handleChange}
              error={signupError}
            />
            <InputComp
              name="email"
              label="Email"
              type="email"
              value={signupValues.email}
              handleChange={handleChange}
              error={signupError}
            />
            <InputComp
              name="password"
              label="Password"
              type={passStatus ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              value={signupValues.password}
              handleChange={handleChange}
              error={signupError}
            />
            <InputComp
              name="confirmPassword"
              label="Confirm Password"
              type={passStatus ? "text" : "password"}
              value={signupValues.confirmPassword}
              handleChange={handleChange}
              error={signupError}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{ backgroundColor: teal[500] }}
              disabled={
                !signupValues.firstname ||
                !signupValues.lastname ||
                !signupValues.email ||
                !signupValues.password ||
                !signupValues.confirmPassword
              }
            >
              Sign Up
            </Button>
            <Typography variant="body1" align="right">
              Already have an account?
              <Link to="/auth/login" style={{ textDecorationLine: "none" }}>
                Log In
              </Link>
            </Typography>
          </Stack>
        </form>
      </Paper>
      <SnackbarComp signupOpen={signupOpen} setSignupOpen={setSignupOpen} />
    </Container>
  );
};

export default SignUp;
