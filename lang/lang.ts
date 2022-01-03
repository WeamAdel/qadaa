import InvalidLanguageType from "../errors/InvalidLanguageType";

import AR_TRANSLATION from "./ar";
import EN_TRANSLATION from "./en";

enum Languages {
  en = "en",
  ar = "ar",
}

const languages = {
  en: AR_TRANSLATION,
  ar: EN_TRANSLATION,
};

export function getLangTrans(lang: Languages = Languages.en) {
  if (!(lang in languages)) throw new InvalidLanguageType(lang);

  return languages[lang];
}
