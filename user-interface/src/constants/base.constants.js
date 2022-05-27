const baseURL = `${process.env.VUE_APP_PROTOCOL}${process.env.VUE_APP_HOST}`;
const wpJson = `${baseURL}${process.env.VUE_APP_WP_JSON}`;

export const conf = {
  host: process.env.VUE_APP_HOST,
  baseURL: baseURL,
  wpJson: wpJson,
  wpJwtAuthV1: `${wpJson}${process.env.VUE_APP_API_V1_JWT_AUTH}`,
  wpV2API: `${wpJson}${process.env.VUE_APP_API_V2_FIX}`,
};

export const httpCodes = {
  ok: 200,
  internalError: 500,
  notFound: 404,
  forbidden: 403,
  conflict: 409,
};

// VUE_APP_PROTOCOL=http://
// VUE_APP_HOST=192.168.100.18
// # VUE_APP_HOST=192.168.100.121
// VUE_APP_WP_JSON=/wp-json
// VUE_APP_API_V2_FIX=/wp/v2
// VUE_APP_API_V1_JWT_AUTH=/jwt-auth/v1
