import { confApp } from "./base.constants";

export const wpJwtAPI = {
  token: `${confApp.wpJwtApiURL}/auth`,
  validate: `${confApp.wpJwtApiURL}/auth/validate`,
  revoke: `${confApp.wpJwtApiURL}/auth/revoke`,
  autoLogin: `${confApp.wpJwtApiURL}/autologin`,
};
