import { defineStore } from "pinia";
import { post } from "@/modules/api-request.module";
import { wpJWTAPI } from "@/constants/wp-api-url.constants";
import { httpCodes } from "@/constants/base.constants";
import { setIfNotUndefined } from "@/utils/store.utils";

/* 
defineStore({
  id: "",
  state: () => ({}),
  getters: {},
  actions: {},
});
*/
const INITIAL_STATE = {
  isLoggedIn: false,
  user: null,
  token: null,
  message: "",
};

export const useAuthenticationStore = defineStore({
  id: "auth",
  state: () => ({ ...INITIAL_STATE }),
  persist: { enabled: true, strategies: [{ storage: sessionStorage }] },
  getters: {},
  actions: {
    updateState(newState) {
      if (newState === undefined || newState === null) return;

      this.isLoggedIn = setIfNotUndefined(newState.isLoggedIn, this.isLoggedIn);
      this.user = setIfNotUndefined(newState.user, this.user);
      this.token = setIfNotUndefined(newState.token, this.isLoggedIn);
      this.message = setIfNotUndefined(newState.message, this.message);
    },
    initState() {
      this.updateState(INITIAL_STATE);
    },
    async getTokenAction(userName, password) {
      this.initState();
      const newState = await getToken(userName, password);
      this.updateState(newState);
    },
  },
});

/********************************************************************
 * Functions for actions:
 * The following functions simplify actions for each store
 */

const getToken = async (userName, password) => {
  const body = { username: userName, password: password };
  const resp = await post(wpJWTAPI.token, body);

  if (resp.status === httpCodes.ok) {
    const { token, user_email, user_nicename, user_display_name } = resp.data;
    const user = {
      user_email: user_email,
      user_nicename: user_nicename,
      user_display_name: user_display_name,
    };
    return {
      isLoggedIn: true,
      user: user,
      token: token,
      message: "User logged successfully",
    };
  }

  return { isLoggedIn: false, message: resp.data?.message };
};
