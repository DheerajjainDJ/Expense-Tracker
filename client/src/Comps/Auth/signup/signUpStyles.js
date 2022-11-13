import { makeStyles } from "@mui/styles";
import { teal } from "@mui/material/colors";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "120px",
    marginBottom: "25px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      marginTop: "90px",
    },
  },
  avatar: {
    backgroundColor: teal[500],
    padding: "5px",
    margin: "6px",
  },
}));
