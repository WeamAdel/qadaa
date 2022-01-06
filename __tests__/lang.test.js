import EN_TRANSLATION from "../lang/en";
import AR_TRANSLATION from "../lang/ar";
import { getLangTrans } from "../lang/lang";
import Language from "../types/Language";
import InvalidLanguageType from "../errors/InvalidLanguageType";

test("All language have corresponding translation with default language", () => {
  expect(Object.keys(AR_TRANSLATION)).toEqual(Object.keys(EN_TRANSLATION));
});

describe("Gets the correct language or throws", () => {
  test("Gets the correct language", () => {
    const langTrans = getLangTrans(Language.en);
    expect(langTrans).toEqual(EN_TRANSLATION);
  });

  test("Throws on passing invalid language type", () => {
    expect(() => {
      getLangTrans("pharaonic");
    }).toThrowError(InvalidLanguageType);
  });
});
