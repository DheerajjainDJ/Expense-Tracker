import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useStyles} from "./styles"
import { getUserTransaction } from "../../Redux/TransactionActions";
import { Grid } from "@mui/material";
import Details from "../Details/Details";
import Main from "../Main/Main";

const Expense = () => {
  const dispatch = useDispatch();
  const classes = useStyles()

  useEffect(() => {
    dispatch(getUserTransaction());
  }, [dispatch]);

  return (
    <div>
      <Grid
        container
        spacing={3}
        sx={{ minHeight: "100vh", padding: "10px 20px" }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={11} md={7} sm={8} lg={3.5} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={11} md={7} sm={8} lg={3.5}>
          <Main />
        </Grid>
        <Grid item xs={11} md={7} sm={8} lg={3.5} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={11} md={7} sm={8} lg={3.5}>
          <Details title="Expense" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Expense;
