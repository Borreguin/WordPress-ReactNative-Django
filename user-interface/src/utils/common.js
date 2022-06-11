/**
 * Shared utilities.
 */

export const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * Add timestamp to the message.
 */
export const consoleWTime = (message) => {
  const d = new Date();
  const dFormat = `[${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`;
  return `${dFormat} - ${message}`;
};
