import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "es",
  lng: "es",
  resources: {
    en: {
      login: require("./en/login.json"),
    },
    es: {
      login: require("./es/login.json"),
    },
  },
  ns: ["login"],
  // defaultNS: "translations",
});

i18n.languages = ["en", "es"];

export default i18n;
