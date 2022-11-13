import { styled } from "@mui/material/styles";
import { teal } from "@mui/material/colors";

export const Button = styled("button")(({ theme }) => ({
  textTransform: "uppercase",
  borderRadius: "20px",
  border: "none",
  backgroundColor: teal[500],
  fontWeight: "bold",
  color: "white",
  padding: "13px 22px",
  marginRight: "8px",
  cursor: "pointer",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: "#fff",
    color: teal[500],
    border: teal[500],
  },
}));
