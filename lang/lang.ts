import InvalidLanguageType from "../errors/InvalidLanguageType";

import AR_TRANSLATION from "./ar";
import EN_TRANSLATION from "./en";

export enum Languages {
  en = "en",
  ar = "ar",
}

export const langTranslations = {
  en: EN_TRANSLATION,
  ar: AR_TRANSLATION,
};

/**
 * Gets the the specified language.
 *
 * @lang Site language.
 */
export function getLangTrans(lang: Languages = Languages.en) {
  if (!(lang in langTranslations)) throw new InvalidLanguageType(lang);

  return langTranslations[lang];
}

/**
 * Checks whether the languae is right to left or not.
 *
 * @param lang Site language
 */
export function isRTLLang(lang: Languages): Boolean {
  return lang && lang === Languages.ar;
}
