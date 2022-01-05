import Link from "next/link";
import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import Route from "../../../settings/routes";

function Logo() {
  const lang = useContext(LangContext);

  return (
    <div className="navbar__logo">
      <Link href={Route.home}>{lang.siteName}</Link>
    </div>
  );
}

export default Logo;
