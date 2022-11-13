import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { makeStyles } from "@mui/styles";
import { useTransaction } from "../../customHook/useTransaction";

const useStyles = makeStyles((theme) => ({
  Income: {
    borderBottom: "10px solid green",
  },
  Expense: {
    borderBottom: "10px solid red",
  },
}));

const Details = ({ title }) => {
  const classes = useStyles();
  const { total, chartData } = useTransaction(title);
  return (
    <div>
      <Card
        sx={{ padding: "0px 10px" }}
        className={title === "Income" ? classes.Income : classes.Expense}
      >
        <CardHeader title={<Typography variant="h5">{title}</Typography>} />
        <CardContent>
          <Typography variant="h6">Total = ₹{total}</Typography>
          <Doughnut data={chartData} radius="50%" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
