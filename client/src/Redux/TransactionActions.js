import { ADD_TRANSACTION, REMOVE_TRANSACTION, GET_TRANSACTION } from "./types";
import { addTransaction, getTransaction, deleteTransaction } from "../api/api";

export const postTransaction = (transactionData) => async (dispatch) => {
  try {
    const { data } = await addTransaction(transactionData);
    dispatch({ type: ADD_TRANSACTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserTransaction = () => async (dispatch) => {
  try {
    const { data } = await getTransaction();
    dispatch({ type: GET_TRANSACTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeTransaction = (id) => async (dispatch) => {
  try {
    await deleteTransaction(id);
    dispatch({ type: REMOVE_TRANSACTION, payload: id });
  } catch (error) {
    console.log(error);
  }
};
