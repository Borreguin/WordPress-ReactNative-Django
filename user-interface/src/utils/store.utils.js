export const setIfNotUndefined = (toCheck, toKeepIfUndefined) => {
  return toCheck !== undefined ? toCheck : toKeepIfUndefined;
};
