const baseURL = `${process.env.VUE_APP_PROTOCOL}${process.env.VUE_APP_HOST}`;
const wpJson = `${baseURL}${process.env.VUE_APP_WP_JSON}`;

export const conf = {
  host: process.env.VUE_APP_HOST,
  baseURL: baseURL,
  wpJson: wpJson,
  wpJwtAuthV1: `${wpJson}${process.env.VUE_APP_API_V1_JWT_AUTH}`,
  wpV2API: `${wpJson}${process.env.VUE_APP_API_V2_FIX}`,
};
