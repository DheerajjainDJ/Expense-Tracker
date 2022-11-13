import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import Form from "./Form/Form";
import ListComp from "./List/List";

const Main = () => {
  const transactions = useSelector((state) => state.transaction);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const total = transactions?.reduce(
    (acc, currVal) =>
      currVal.type === "Income"
        ? (acc = acc + currVal.Amount)
        : (acc = acc - currVal.Amount),
    0
  );
  return (
    <div>
      <Card sx={{ padding: "0px 10px" }}>
        <CardHeader
          title={<Typography variant="h5">Expense Tracker</Typography>}
          align="center"
        />
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Total Balance = ₹{total}
          </Typography>
          <Form user={user} />
        </CardContent>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <ListComp user={user} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Main;
