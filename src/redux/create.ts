import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./modules/reducer";
import rootSaga from "./modules/rootSaga";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import history from "../history";
import TokenService from "../service/TokenService";

// store 생성
const create = () => {
  const token = TokenService.get();

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer(history),
    {
      auth: {
        token,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export default create;
