/**
 * Admin entry point.
 *
 * src/web-entry-points/admin-index.js
 */

import { consoleWTime } from "../utils/common";

export const admin = {
  log(message) {
    console.log(consoleWTime(message));
  },
};

// Lets test!
admin.log("This is a message to the admin! v.0.0.1");
