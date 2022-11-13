import { ADD_TRANSACTION, REMOVE_TRANSACTION, GET_TRANSACTION } from "./types";

const initialState = [];

export const TransactionReducer = (state = initialState, action) => {
  let transactions;
  switch (action.type) {
    case ADD_TRANSACTION:
      transactions = [action.payload, ...state];
      return transactions;
    case GET_TRANSACTION:
      transactions = action.payload
      return transactions;
    case REMOVE_TRANSACTION:
      transactions = state.filter((t) => t.uniqueId !== action.payload);
      return transactions;
    default:
      return state;
  }
};
