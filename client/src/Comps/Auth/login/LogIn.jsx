import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { teal } from "@mui/material/colors";
import { login } from "../../../api/api";
import { LOGIN } from "../../../Redux/types";
import {
  Container,
  Paper,
  Avatar,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InputComp from "../signup/InputComp";
import { useStyles } from "../signup/signUpStyles";

const LogIn = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const loginInitialValues = {
    email: "",
    password: "",
  };

  const loginInitialError = {
    email: "",
    password: "",
  };

  const [loginValues, setLoginValues] = useState(loginInitialValues);
  const [passStatus, setPassStatus] = useState(false);
  const [loginError, setLoginError] = useState(loginInitialError);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const handleShowPassword = () => {
    setPassStatus(!passStatus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError(loginInitialError);
    try {
      const { data } = await login(loginValues);
      // console.log(data);
      dispatch({ type: LOGIN, payload: data });
      navigate("/expense");
    } catch (error) {
      error.response.data &&
        setLoginError({
          ...loginError,
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
          <PeopleAltIcon size="large" />
        </Avatar>
        <Typography variant="h6" gutterBottom>
          LogIn
        </Typography>
        <form style={{ width: "100%" }} noValidate onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <InputComp
              name="email"
              type="email"
              label="Email"
              value={loginValues.email}
              handleChange={handleChange}
              error={loginError}
            />
            <InputComp
              name="password"
              type={passStatus ? "text" : "password"}
              label="Password"
              handleShowPassword={handleShowPassword}
              value={loginValues.password}
              handleChange={handleChange}
              error={loginError}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: teal[500] }}
              type="submit"
              size="large"
              disabled={!loginValues.email || !loginValues.password}
            >
              log in
            </Button>
            <Typography fontSize="13px" variant="body1" align="center">
              OR
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Link
                to="/forgot-password"
                style={{ fontSize: "14px", textDecorationLine: "none" }}
              >
                Forget Password ?
              </Link>

              <Typography sx={{ fontSize: "14px" }}>
                Don't Have An Account?
                <Link
                  to="/auth/signUp"
                  style={{ fontSize: "14px", textDecorationLine: "none" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LogIn;
