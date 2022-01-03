import EN_TRANSLATION from "../../lang/en";
import AR_TRANSLATION from "../../lang/ar";
import { getLangTrans, Languages } from "../../lang/lang";
import InvalidLanguageType from "../../errors/InvalidLanguageType";

test("All languages have corresponding translation with default language", () => {
  expect(Object.keys(AR_TRANSLATION)).toEqual(Object.keys(EN_TRANSLATION));
});

describe("Gets the correct language or throws", () => {
  test("Gets the correct language", () => {
    const langTrans = getLangTrans(Languages.en);
    expect(langTrans).toEqual(EN_TRANSLATION);
  });

  test("Throws on passing invalid language type", () => {
    expect(() => {
      getLangTrans("pharaonic");
    }).toThrowError(InvalidLanguageType);
  });
});
