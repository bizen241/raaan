import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "pages.HomePage.title": "Home",
        "editor.UserConfigEditor.language": "language"
      }
    },
    ja: {
      translation: {
        "pages.HomePage.title": "ホーム",
        "editor.UserConfigEditor.language": "言語"
      }
    }
  },
  lng: "ja",
  fallbackLng: "ja",
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});
