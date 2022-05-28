import config from "./config";

const baseURL = `${config.APP_PROTOCOL}://${config.HOST_IP}`;
const restPostfix = "?rest_route=";

export const confApp = {
  host: config.HOST_IP,
  baseURL: baseURL,
  wpJwtApiURL: `${baseURL}/${restPostfix}`,
};

export const httpCodes = {
  ok: 200,
  internalError: 500,
  notFound: 404,
  forbidden: 403,
  conflict: 409,
};
