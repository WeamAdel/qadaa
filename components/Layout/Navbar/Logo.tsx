import Link from "next/link";
import { useContext } from "react";
import { LangContext } from "../../Lang/Lang";

function Logo() {
  const lang = useContext(LangContext);

  return (
    <div className="navbar__logo">
      <Link href="/">{lang.siteName}</Link>
    </div>
  );
}

export default Logo;
