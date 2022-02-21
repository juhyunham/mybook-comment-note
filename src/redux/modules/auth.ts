import { push } from "react-router-redux";
import { Action, createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery } from "redux-saga/effects";
import TokenService from "../../service/TokenService";
import { AuthState, LoginReqType } from "../../types";
import UserService from "./../../service/UserService";

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = `my-books/auth`;

// action
export const { pending, success, fail } = createActions("PENDING", "SUCCESS", "FAIL", { prefix });

const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      token: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

//saga
export const { login, logout } = createActions("LOGIN", "LOGOUT", { prefix });

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());

    // business로직이랑 분리
    const token: string = yield call(UserService.login, action.payload);

    // 받아온 token localStorage에 넣기.
    TokenService.set(token);
    yield put(success(token));
    yield put(push("/"));
  } catch (error) {
    // yield put(fail(new Error(error?.response?.data?.error || "UnKnown Error")));
  }
}

function* logoutSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());

    // business로직이랑 분리
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);

    TokenService.set(token);
  } catch (error) {
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
