import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTransaction } from "../../../Redux/TransactionActions";
import {
  List,
  ListItem,
  Slide,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { red, green } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  income: {
    backgroundColor: green[500],
  },
  expense: {
    backgroundColor: red[500],
    textDecorationLine: "line-through",
  },
}));

const ListComp = ({ user }) => {
  const classes = useStyles();
  const transactions = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  return (
    <div>
      <List sx={{ maxHeight: "150px", overflow: "auto" }}>
        {transactions?.map((transaction) => (
          <Slide
            direction="down"
            in
            mountOnEnter
            unmountOnExit
            key={transaction.uniqueId}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  className={
                    transaction.type === "Income"
                      ? classes.income
                      : classes.expense
                  }
                >
                  ₹
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1">₹{transaction.Amount}</Typography>
                }
                secondary={
                  <Typography variant="body2" textTransform="capitalize">
                    {transaction.how} - {transaction.date}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title="Delete" arrow>
                  <IconButton
                    disabled={!user}
                    onClick={() =>
                      dispatch(removeTransaction(transaction.uniqueId))
                    }
                    sx={{ marginLeft: "30px" }}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))}
      </List>
    </div>
  );
};

export default ListComp;
