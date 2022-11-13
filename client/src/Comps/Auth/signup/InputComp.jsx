import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputComp = ({
  name,
  label,
  type,
  value,
  handleShowPassword,
  handleChange,
  error,
}) => {
  return (
    <TextField
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      required
      // color="primary"
      color={error[name] ? "error" : "info"}
      helperText={
        error[name] && (
          <span
            style={{
              color: "red",
              fontSize: "14px",
              textTransform: "capitalize",
            }}
          >
            {error[name]}
          </span>
        )
      }
      InputProps={
        name === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassword}
                    sx={{ color: "black" }}
                  >
                    {type === "password" ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  );
};

export default InputComp;
