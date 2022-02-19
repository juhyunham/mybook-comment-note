import { combineReducers } from "redux";
import auth from "./auth";
import { History } from "history";
import { connectRouter } from "connected-react-router";

const rootReducer = (history: History<unknown>) =>
  combineReducers({
    auth,
    router: connectRouter(history),
  });

export default rootReducer;
