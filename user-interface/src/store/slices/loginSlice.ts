import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOGIN_SLICE } from "../storeConstants";
import i18n from "i18next";
import { RootState } from "../store";
import { wpJwtAPI } from "../../constants/wp-api.constants";
import axios from "axios";
import { httpCodes } from "../../constants/base.constants";

type User = {
  user_email: string;
  user_nicename: string;
  user_display_name: string;
};

type UserPayload = {
  user: User;
  token: string;
};

// Define a type for the slice state
interface LoginState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  message: string | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: LoginState = {
  isLoggedIn: false,
  user: null,
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
      loginReset();
      state.loading = true;
      state.message = "Calling the API";
    },
    loginOnSuccess: (state, action: PayloadAction<UserPayload>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.message = i18n.t("loginSuccess");
      state.loading = false;
    },
    loginOnFailure: (state) => {
      loginReset();
      state.loading = false;
      state.message = i18n.t("LoginFailure");
    },
    loginOnFailureWithMsg: (state, action: PayloadAction<string>) => {
      loginReset();
      state.loading = false;
      state.message = action.payload;
    },
    loginLogout: (state) => {
      loginReset();
      state.message = i18n.t("logoutSuccess");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginOnFailure,
  loginOnSuccess,
  loginRequested,
  loginReset,
  loginOnFailureWithMsg,
  loginLogout,
} = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const loginSelector = (state: RootState) => state.login;

export default loginSlice.reducer;

/*
 * Action functions for this Slice:
 */

// Login and get a token
export const getToken = (userName, password) => {
  return async (dispatch) => {
    dispatch(loginRequested());
    const body = { username: userName, password: password };
    let msg = null;
    const resp = await axios
      .post(wpJwtAPI.token, body)
      .catch((e) => (msg = e.message));
    if (resp.status === httpCodes.ok) {
      const { token, user_email, user_nicename, user_display_name } = resp.data;
      const user = {
        user_email: user_email,
        user_nicename: user_nicename,
        user_display_name: user_display_name,
      } as User;
      dispatch(loginOnSuccess({ user, token }));
      return;
    }
    msg === null
      ? dispatch(loginOnFailure())
      : dispatch(loginOnFailureWithMsg(msg));
  };
};

// Logout and revoke token
export const revokeToken = () => {
  return async (dispatch) => {
    dispatch(loginLogout());
  };
};
