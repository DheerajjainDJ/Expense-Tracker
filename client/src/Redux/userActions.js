import { LOGOUT } from "./types";
import * as api from "../api/api";

export const loggingOut = (navigate) => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: LOGOUT });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
