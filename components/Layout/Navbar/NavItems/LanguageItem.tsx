import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LangContext } from "../../../../Providers/Language";
import Language from "../../../../types/Language";
import Latern from "./Latern";

function LinkItem() {
  const { locale = Language.en, pathname } = useRouter();
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
