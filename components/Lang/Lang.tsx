import { createContext } from "react";
import { getLangTrans, Languages } from "../../lang/lang";

export let LangContext = createContext(getLangTrans(Languages.en));

function Lang({ lang, children }: { lang: Languages; children: any }) {
  const langTrans = getLangTrans(lang);
  LangContext = createContext(langTrans);

  return <LangContext.Provider value={langTrans}>{children}</LangContext.Provider>;
}

export default Lang;
