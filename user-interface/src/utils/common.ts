/**
 * Shared utilities.
 */

export const isValidEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Add timestamp to the message.
 */
export const consoleWTime = (message: string) => {
  const d = new Date();
  const dFormat = `[${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`;
  return `${dFormat} - ${message}`;
};

/**
 * Display abbreviation of the name
 */

export const displayAbbreviation = (userName: string) => {
  if (userName === undefined) return "--";
  const split = userName.split(" ");
  if (split.length > 1) {
    return `${split[0][0]}${split[1][0]}`;
  }
  return userName.substring(0, 1);
};

export const colorList = [
  "#de6262",
  "#d3321e",
  "#c49a4c",
  "#b27606",
  "#245427",
  "#06863f",
  "#15808a",
  "#0c5b9d",
  "#5744d5",
  "#8c32ec",
  "#d967bd",
  "#e14b50",
  "#A6A6A699",
  "#4F4D4DFF",
];

export const selectColorForThisName = (userName: string) => {
  const value = userName.split("").reduce((acc, val) => {
    return acc + val.charCodeAt(0);
  }, 0);
  const idx = value % colorList.length;
  return colorList[idx];
};
