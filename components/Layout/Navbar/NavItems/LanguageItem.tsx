import Link from "next/link";
import { useContext } from "react";
import useMyRouter from "../../../../hooks/useMyRouter";
import { LangContext } from "../../../../Providers/Language";
import Language from "../../../../types/Language";
import Latern from "./Latern";

function LinkItem() {
  const { locale, pathname } = useMyRouter();
  const { secondLang } = useContext(LangContext);

  return (
    <li className="navbar__nav-item navbar__language-item" data-locale={locale}>
      <Latern />
      <Link href={pathname} locale={locale == Language.en ? Language.ar : Language.en}>
        <a data-testid="nav-lang">{secondLang}</a>
      </Link>
    </li>
  );
}

export default LinkItem;
