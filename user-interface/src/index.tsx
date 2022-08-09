import "./i18n/config"; // Allows translation
import "./utils/icons";
import entryPointList from "./wb-entry-points/register-entry-points.js"; // To use entry points

window.onload = loadDynamicallyScriptsForEntryPoints;

function loadDynamicallyScriptsForEntryPoints() {
  for (let entryPoint of entryPointList) {
    const entryPointTag = document.getElementById(
      entryPoint.name
    ) as HTMLElement;
    if (entryPointTag === null) {
      continue;
    }
    let ScriptTag = document.createElement("script");
    ScriptTag.src = entryPoint.url;
    document.getElementsByTagName("head")[0].appendChild(ScriptTag);
    console.log(`Entry-point added: ${entryPoint.name}`);
  }
}
