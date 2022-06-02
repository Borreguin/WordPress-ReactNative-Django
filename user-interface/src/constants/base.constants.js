import config from "./config";

const baseURL = `${config.APP_PROTOCOL}://${config.HOST_IP}`;
const restPostfix = "?rest_route=";

export const confApp = {
  host: config.HOST_IP,
  baseURL: baseURL,
  wpJwtApiURL: `${baseURL}/${restPostfix}/${config.WP_JWT_LOGIN}`,
};

export const httpCodes = {
  ok: 200,
  internalError: 500,
  unauthorized: 401,
  notFound: 404,
  forbidden: 403,
  conflict: 409,
};
