import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { teal } from "@mui/material/colors";
import formatDate from "../../../utils/formatDate";
import { v4 as uuid } from "uuid";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import SnackbarComp from "../../snackbar/SnackbarComp";
import { postTransaction } from "../../../Redux/TransactionActions";

const Form = ({ user }) => {
  const initialState = {
    type: "Income",
    how: "",
    Amount: "",
    date: formatDate(new Date()),
  };
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const buttonHandler = () => {
    const transaction = {
      ...formData,
      Amount: Number(formData.Amount),
      uniqueId: uuid(),
    };
    dispatch(postTransaction(transaction));
    setOpen(true);
    setFormData(initialState);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              variant="outlined"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="How ?"
              variant="outlined"
              value={formData.how}
              onChange={(e) =>
                setFormData({ ...formData, how: e.target.value })
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Amount"
              variant="outlined"
              value={formData.Amount}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setFormData({ ...formData, Amount: e.target.value })
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: formatDate(e.target.value) })
              }
            />
          </FormControl>
        </Grid>
        <Button
          onClick={buttonHandler}
          variant="contained"
          sx={{ marginTop: "20px", backgroundColor: teal[500] }}
          fullWidth
          disabled={!user || !formData.how || !formData.Amount}
        >
          CREATE
        </Button>
        <SnackbarComp open={open} setOpen={setOpen} />
      </Grid>
    </div>
  );
};

export default Form;
