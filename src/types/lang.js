// JavaScript equivalent of the TypeScript Lang type
// Original: export type Lang = "ru" | "en";

// In JavaScript, we can use constants to represent the allowed values
export const SUPPORTED_LANGUAGES = ["ru", "en"];

// We can also create a validation function
export function isValidLang(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}
