import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const supportedLngs = ["en", "bg"];

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs,
    debug: false,
    backend: {
      loadPath: "/locales/{{lng}}/common.json",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
export default i18n;
