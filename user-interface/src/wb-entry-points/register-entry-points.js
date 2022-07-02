// Register all the entry points for this application
// This allows:
// 1. Compile all end-points trough react-app-rewired
// 2. Load scripts dynamically in WordPress.
import { confApp } from "../constants/base.constants";
import configEnv from "../constants/config";

let entryPointList = [
  // frontend: path.resolve(entryPointPath, "ep_login.tsx"),
  // frontend: path.resolve(__dirname, "./src/index.tsx"),
  { name: "ep_login", filename: "ep_login.tsx" },
];

// include path to publish
const url =
  confApp.baseURL +
  `/wp-content/plugins/${configEnv.WP_REST_API_PLUGIN}/build/static/js/`;

for (let ep of entryPointList) {
  ep["url"] = url + ep.filename.replace("tsx", "js");
}

export default entryPointList;
