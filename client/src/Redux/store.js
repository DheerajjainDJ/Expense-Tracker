import { combineReducers, applyMiddleware,createStore } from "redux";
import { TransactionReducer } from "./TransactionReducer";
import { userReducer } from "./userReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  transaction: TransactionReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
