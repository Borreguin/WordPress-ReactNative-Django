import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/_index-en";
import translationES from "./es/_index-es";

i18n.use(initReactI18next).init({
  fallbackLng: "es",
  lng: "es",
  resources: {
    en: {
      translations: translationEN,
    },
    es: {
      translations: translationES,
    },
  },
  ns: ["translations"],
  // defaultNS: "translations",
});

i18n.languages = ["en", "es"];

export default i18n;
