import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "pages.HomePage.title": "Home",
        "editor.UserConfigEditor.label.language": "language",
        "editor.UserConfigEditor.label.theme": "theme"
      }
    },
    ja: {
      translation: {
        "pages.HomePage.title": "ホーム",
        "editor.UserConfigEditor.label.language": "言語",
        "editor.UserConfigEditor.label.theme": "テーマ"
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
