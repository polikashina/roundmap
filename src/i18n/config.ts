import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import commonRu from "./ru/common.json";
import areaRu from "./ru/area.json";
import commonEn from "./en/common.json";
import areaEn from "./en/area.json";

export const defaultNS = "common";

const resourcesRu = {
  common: commonRu,
  area: areaRu,
};

export type Resources = typeof resourcesRu;

const resourcesEn: Resources = {
  common: commonEn,
  area: areaEn,
};

// Get initial language from server if available
const getInitialLanguage = (): string => {
  if (typeof window !== "undefined" && window.__INITIAL_LANGUAGE__) {
    return window.__INITIAL_LANGUAGE__;
  }

  // Fallback to browser language or default
  return typeof navigator !== "undefined"
    ? navigator.language?.split("-")[0] || "ru"
    : "ru";
};

i18next.use(initReactI18next).init({
  lng: getInitialLanguage(),
  debug: true,
  fallbackLng: "en",
  resources: {
    ru: resourcesRu,
    en: resourcesEn,
  },
  defaultNS,
});
