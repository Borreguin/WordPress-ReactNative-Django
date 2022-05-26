import { createSlice } from "@reduxjs/toolkit";
import { LOGIN_SLICE } from "../storeConstants";
import i18n from "i18next";
import { RootState } from "../store";

// Define a type for the slice state
interface LoginState {
  isLoggedIn: boolean;
  user: object | null;
  token: string | null;
  message: string | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: LoginState = {
  isLoggedIn: false,
  user: null,
  token: null,
  message: "Not logged yet",
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
    loginOnSuccess: (state, action) => {
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
  },
});

// Action creators are generated for each case reducer function
export const { loginOnFailure, loginOnSuccess, loginRequested, loginReset } =
  loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const isUserLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const loginMessageSelect = (state: RootState) => state.login.message;

export default loginSlice.reducer;
