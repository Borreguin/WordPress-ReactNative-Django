import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOGIN_SLICE } from "../storeConstants";
import i18n from "i18next";
import { RootState } from "../store";
import { wpJwtAPI } from "../../constants/wp-api.constants";
import axios from "axios";
import { httpCodes } from "../../constants/base.constants";
import { isValidEmail } from "../../utils/common";

type User = {
  ID: string;
  display_name: string;
  user_login: string;
  user_nicename: string;
  user_email: string;
  user_display_name: string;
  user_url: string;
  user_registered: string;
  user_activation_key: string;
  user_status: string;
};

type LoginResp = {
  user: User;
  roles: Array<string>;
};

type TokenPayload = {
  jwt: string;
};

// Define a type for the slice state
interface LoginState {
  isLoggedIn: boolean;
  user: User | null;
  roles: Array<string> | null;
  token: string | null;
  message: string | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: LoginState = {
  isLoggedIn: false,
  user: null,
  roles: [],
  token: null,
  message: "",
  loading: false,
};

export const loginSlice = createSlice({
  name: LOGIN_SLICE,
  initialState: initialState,
  reducers: {
    loginReset: () => initialState,
    loginRequested: (state) => {
      state.loading = true;
      state.message = i18n.t("loading");
    },
    loginSetToken: (state, action: PayloadAction<TokenPayload>) => {
      state.token = action.payload.jwt;
      state.message = i18n.t("setToken");
      state.loading = false;
    },
    loginOnValidToken: (state, action: PayloadAction<LoginResp>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.roles = action.payload.roles;
      state.message = i18n.t("loginSuccess");
    },
    loginOnFailure: () => {
      return { ...initialState, message: i18n.t("LoginFailure") };
    },
    loginOnFailureWithMsg: (state, action: PayloadAction<string>) => {
      return { ...initialState, message: action.payload };
    },
    loginLogout: () => {
      return { ...initialState, message: i18n.t("logoutSuccess") };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginOnFailure,
  loginSetToken,
  loginRequested,
  loginReset,
  loginOnFailureWithMsg,
  loginLogout,
  loginOnValidToken,
} = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const loginSelector = (state: RootState) => state.login;

export default loginSlice.reducer;

/*
 * Action functions for this Slice:
 */

// dispatch actions on error
const dispatchOnError = (dispatch, e) => {
  if (e.response !== undefined && e.response.data !== undefined) {
    let msg =
      e.response.data.data.message !== undefined
        ? e.response.data.data.message
        : e.message;
    let tMsg = i18n.t(msg);
    dispatch(loginOnFailureWithMsg(tMsg));
  } else if (e.message !== undefined) {
    dispatch(loginOnFailureWithMsg(e.message));
  } else {
    dispatch(loginOnFailure());
  }
};

// create header for sending the token
export const createTokenHeader = (token) => {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// Get a token
export const getToken = (userNameOrMail, password) => {
  return async (dispatch) => {
    dispatch(loginRequested());
    let body;
    if (isValidEmail(userNameOrMail)) {
      body = { email: userNameOrMail, password: password };
    } else {
      body = { username: userNameOrMail, password: password };
    }
    await axios
      .post(wpJwtAPI.token, body)
      .then((resp) => {
        if (resp.status === httpCodes.ok) {
          const { data } = resp.data;
          dispatch(loginSetToken({ jwt: data.jwt }));
          dispatch(validateToken());
        }
      })
      .catch((e) => dispatchOnError(dispatch, e));
  };
};

// Validate a token
export const validateToken = () => {
  return async (dispatch, getState: () => RootState) => {
    const config = createTokenHeader(getState().login.token);
    await axios
      .get(wpJwtAPI.validate, config)
      .then((resp) => {
        if (resp.status === httpCodes.ok) {
          const { data } = resp.data;
          dispatch(
            loginOnValidToken({ user: data.user as User, roles: data.roles })
          );
        }
      })
      .catch((e) => dispatchOnError(dispatch, e));
  };
};

// Logout and revoke token
export const revokeToken = () => {
  return async (dispatch, getState: () => RootState) => {
    const config = createTokenHeader(getState().login.token);
    dispatch(loginReset());
    await axios
      .post(wpJwtAPI.revoke, {}, config)
      .then((resp) => {
        if (resp.status === httpCodes.ok) {
          dispatch(loginLogout());
        }
      })
      .catch((e) => dispatchOnError(dispatch, e));
  };
};
