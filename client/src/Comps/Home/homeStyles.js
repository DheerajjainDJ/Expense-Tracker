import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
  },
  parentBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "100px",
    [theme.breakpoints.down("md")]: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  trackerPic: {
    width: "100%",
    height: "auto",
    mixBlendMode: "multiply",
    backgroundBlendMode: "multiply",
  },
  mainHeading: {
    fontWeight: 500,
    lineHeight: "1.5px",
    marginBottom: "45px",
    fontSize: "3.5rem",
    opacity: 0.8,
    [theme.breakpoints.down("lg")]: {
      fontSize: "2.4rem",
    },
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
      fontSize: "2.1rem",
    },
  },
  subheading: {
    fontWeight: 550,
    fontSize: "20px",
    lineHeight: "28px",
    marginBottom: "26px",
    opacity: 0.7,
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  buttonBox: {
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
}));
