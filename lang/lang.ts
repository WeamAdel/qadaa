import InvalidLanguageType from "../errors/InvalidLanguageType";
import Language from "../types/Language";
import AR_TRANSLATION from "./ar";
import EN_TRANSLATION from "./en";

export const langTranslations = {
  en: EN_TRANSLATION,
  ar: AR_TRANSLATION,
};

/**
 * Gets the the specified language.
 *
 * @lang Site language.
 */
export function getLangTrans(lang: Language = Language.en): { [index: string]: string } {
  if (!(lang in langTranslations)) throw new InvalidLanguageType(lang);

  return langTranslations[lang];
}

/**
 * Checks whether the languae is right to left or not.
 *
 * @param lang Site language
 */
export function isRTLLang(lang: Language): Boolean {
  return lang && lang === Language.ar;
}
