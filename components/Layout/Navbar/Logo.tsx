import Link from "next/link";
import { useContext } from "react";
import { LangContext } from "../../Lang/Lang";

function Logo() {
  const lang = useContext(LangContext);

  return <Link href="/">{lang.siteName}</Link>;
}

export default Logo;
