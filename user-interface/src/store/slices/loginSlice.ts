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

type TokenPayload = {
  jwt: string;
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
    loginSetToken: (state, action: PayloadAction<TokenPayload>) => {
      state.token = action.payload.jwt;
      state.message = "New Token was set";
      state.loading = false;
    },
    loginOnValidToken: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.message = i18n.t("loginSuccess");
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
      .catch((e) => {
        if (e.response !== undefined && e.response.data !== undefined) {
          let msg =
            e.response.data.data.message !== undefined
              ? e.response.data.data.message
              : e.message;
          let tMsg = i18n.t(msg);
          dispatch(loginOnFailureWithMsg(tMsg));
        } else {
          dispatch(loginOnFailure());
        }
      });
  };
};

// Validate a token
export const validateToken = () => {
  return async (dispatch, getState: () => RootState) => {
    const tokenValidateURL = wpJwtAPI.validate;
    const body = { JWT: getState().login.token };
    await axios
      .get(tokenValidateURL, {
        params: body,
      })
      .then((resp) => {
        if (resp.status === httpCodes.ok) {
          const { data } = resp.data;
          dispatch(loginOnValidToken(data.user as User));
        }
      })
      .catch((e) => {
        console.log("fail", e);
      });
  };
};

// Logout and revoke token
export const revokeToken = () => {
  return async (dispatch) => {
    dispatch(loginLogout());
  };
};
