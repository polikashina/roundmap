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

i18next.use(initReactI18next).init({
  lng: "ru",
  debug: true,
  fallbackLng: "en",
  resources: {
    ru: resourcesRu,
    en: resourcesEn,
  },
  defaultNS,
});
