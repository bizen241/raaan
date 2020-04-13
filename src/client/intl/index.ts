import i18next from "i18next";
import i18nextXhrBackend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18next
  .use(i18nextXhrBackend)
  .use(initReactI18next)
  .init({
    lng: "ja",
    fallbackLng: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
  });
