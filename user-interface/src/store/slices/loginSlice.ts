import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOGIN_SLICE_KEY } from "../storeConstants";
import i18n from "i18next";
import { RootState } from "../store";
import { wpJwtAPI } from "../../constants/wp-api.constants";
import axios from "axios";
import { confApp, httpCodes } from "../../constants/base.constants";
import { isValidEmail } from "../../utils/common";
import config from "../../constants/config";
import storage from "redux-persist/lib/storage";

// configure the redux persist library:
export const loginPersistConfig = {
  key: LOGIN_SLICE_KEY,
  version: 1,
  storage,
  blacklist: [],
};

// define types that are used in this slice
export type User = {
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

// Define the type for the slice state
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

// create the slice for the reducer
export const loginSlice = createSlice({
  name: LOGIN_SLICE_KEY,
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
    loginOnFailureWithMsg: (_, action: PayloadAction<string>) => {
      return { ...initialState, message: action.payload };
    },
    loginLogout: () => {
      return { ...initialState, message: i18n.t("logoutSuccess") };
    },
    loginClean: (state) => {
      state.user = null;
      state.loading = false;
      state.isLoggedIn = false;
      state.roles = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginOnFailure,
  loginSetToken,
  loginRequested,
  loginClean,
  loginReset,
  loginOnFailureWithMsg,
  loginLogout,
  loginOnValidToken,
} = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const loginSelector = (state: RootState) => state.login;

// define the reducer for this slice
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
      .catch((e) => dispatchOnError(dispatch, e))
      .then(() => dispatch(openWordPressSession()));
  };
};

// Validate a token
export const validateToken = () => {
  return async (dispatch, getState: () => RootState) => {
    if (getState().login.token === null) return;
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

// check if the user is still logged in
export const validateIfIsStillLoggedIn = () => {
  return async (dispatch) => {
    const isLoggedIn = document.getElementsByClassName("logged-in").length > 0;
    if (!isLoggedIn && config.ENV_PROD) {
      dispatch(loginReset());
    }
  };
};

// Logout and revoke token
export const revokeToken = () => {
  return async (dispatch, getState: () => RootState) => {
    if (getState().login.token === null) {
      dispatch(loginClean());
      return;
    }
    const config = createTokenHeader(getState().login.token);
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

// open WordPress session:
export const openWordPressSession = () => {
  return async (dispatch, getState: () => RootState) => {
    if (getState().login.token === null) {
      dispatch(loginClean());
      return;
    }
    if (config.ENV_DEV) return;
    const configRequest = createTokenHeader(getState().login.token);
    await axios
      .get(wpJwtAPI.autoLogin, configRequest)
      .then((resp) => {
        console.log("TODO: RS autologin definition", resp);
        window.location.href = confApp.baseURL + "/home";
      })
      .catch((e) =>
        console.log(
          `Unable to redirect to page. Check option: Redirect after Auto-Login in Simple JWT Login (Wordpress Plugin)  ${e}`
        )
      );
  };
};
