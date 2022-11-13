import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { loggingOut } from "../../Redux/userActions";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleLogOut = () => {
    dispatch(loggingOut(navigate));
    setUser(null);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log(user);
  return (
    <AppBar
      sx={{
        padding: { xs: "0 15px", md: "0 50px" },
        boxShadow: "none",
        backgroundColor: teal[500],
      }}
    >
      <Toolbar
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Typography
          sx={{ textDecoration: "none", fontWeight: 600 }}
          component={Link}
          to="/"
          variant="h6"
          color="inherit"
        >
          Expense Tracker
        </Typography>
        {user && (
          <Box
            width="110px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Avatar alt={user.result.name} src={user.result.picture}>
              <Typography variant="h6" textTransform="capitalize">
                {user.result.name.charAt(0)}
              </Typography>
            </Avatar>
            <Typography
              onClick={(e) => handleClick(e)}
              sx={{ cursor: "pointer" }}
              variant="h6"
              color="inherit"
            >
              {user.result.name.split(" ")[0]}
            </Typography>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
              <MenuItem
                onClick={handleLogOut}
                sx={{
                  "&:hover": { backgroundColor: teal[500], color: "white" },
                }}
              >
                <LogoutIcon />
                <Typography
                  sx={{ ml: "10px", fontWeight: 550, cursor: "pointer" }}
                >
                  Log Out
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
