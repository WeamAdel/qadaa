import InvalidLanguageType from "../errors/InvalidLanguageType";

import AR_TRANSLATION from "./ar";
import EN_TRANSLATION from "./en";

export enum Languages {
  en = "en",
  ar = "ar",
}

const languages = {
  en: EN_TRANSLATION,
  ar: AR_TRANSLATION,
};

/**
 * Gets the the specified language.
 */
export function getLangTrans(lang: Languages = Languages.en) {
  if (!(lang in languages)) throw new InvalidLanguageType(lang);

  return languages[lang];
}
