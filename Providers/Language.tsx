import { createContext } from "react";
import useMyRouter from "../hooks/useMyRouter";
import { getLangTrans } from "../lang/lang";
import Language from "../types/Language";

export let LangContext = createContext(getLangTrans(Language.en));

function Lang({ children }: { children: any }) {
  const { locale } = useMyRouter();
  // @ts-ignore
  const langTrans = getLangTrans(locale ? locale : Languages.en);

  LangContext = createContext(langTrans);

  return <LangContext.Provider value={langTrans}>{children}</LangContext.Provider>;
}

export default Lang;
