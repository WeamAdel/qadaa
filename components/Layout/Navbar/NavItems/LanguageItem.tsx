import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LangContext } from "../../../../Providers/Language";
import Language from "../../../../types/Language";
import Latern from "./Latern";

function LinkItem() {
  const { locale, pathname } = useRouter();
  const { secondLang } = useContext(LangContext);

  return (
    <li className={`navbar__nav-item`}>
      <Latern />
      <Link href={pathname} locale={locale == Language.en ? Language.ar : Language.en}>
        {secondLang}
      </Link>
    </li>
  );
}

export default LinkItem;
