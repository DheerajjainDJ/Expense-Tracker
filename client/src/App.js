import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Comps/Navbar/Navbar";
import Home from "./Comps/Home/Home";
import SignUp from "./Comps/Auth/signup/SignUp";
import LogIn from "./Comps/Auth/login/LogIn";
import ForgotPassword from "./Comps/Auth/forgotPassword/ForgotPassword";
import PasswordReset from "./Comps/Auth/passwordReset/PasswordReset";
import Expense from "./Comps/Expense/Expense";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Box marginTop="60px">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/auth/signUp" element={<SignUp />} />
            <Route exact path="/auth/login" element={<LogIn />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route
              exact
              path="/password-reset/:id"
              element={<PasswordReset />}
            />
            <Route exact path="/expense" element={<Expense />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
