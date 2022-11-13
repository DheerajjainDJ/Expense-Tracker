import React from "react";
import { Container, Box, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./homeStyles";
import { Button } from "../styledComps/styled";

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const trackerPic =
    "https://img.freepik.com/free-vector/finance-department-employees-are-calculating-expenses-company-s-business_1150-41782.jpg?size=626&ext=jpg&ga=GA1.2.605537194.1647674229";

  return (
    <>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container className={classes.parentBox}>
          <Grid item xs={11} sm={11} md={6} lg={6} alignItems="center">
            <Typography className={classes.mainHeading}>
              Expense Tracker
            </Typography>
            <Typography className={classes.subheading}>
              Tracking bills, purchases and other expenses are easy with this
              Web App. Login Or SignUp To Track Your Expenses.
            </Typography>
            <Box className={classes.buttonBox}>
              <Button onClick={() => navigate("/auth/signUp")}>
                signup now!
              </Button>
              <Button onClick={() => navigate("/auth/login")}>sign in!</Button>
            </Box>
          </Grid>
          <Grid item xs={11} sm={11} md={6} lg={6}>
            <Box
              component="img"
              alt="tracker-pic"
              src={trackerPic}
              className={classes.trackerPic}
            />
          </Grid>
        </Grid>
      </Container>
      <footer>
        <Paper square sx={{ padding: "20px 0" }}>
          <Typography align="center" variant="body1" color="gray">
            Copyright © Expense Tracker
          </Typography>
        </Paper>
      </footer>
    </>
  );
};

export default Home;
