import EN_TRANSLATION from "../../lang/en";
import AR_TRANSLATION from "../../lang/ar";

test("All languages have corresponding translation with default language", () => {
  expect(Object.keys(AR_TRANSLATION)).toEqual(Object.keys(EN_TRANSLATION));
});
