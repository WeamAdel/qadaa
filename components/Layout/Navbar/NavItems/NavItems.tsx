import { useContext } from "react";
import { LangContext } from "../../../../Providers/Language";
import LinkItem from "./Linktem";
import ThemeItem from "./ThemeItem";
import LanguageItem from "./LanguageItem";
import Route from "../../../../settings/routes";

function NavItems() {
  const lang = useContext(LangContext);

  return (
    <ul className="navbar__links-list">
      <LinkItem title={lang.about} withLatern={true} url={Route.about} />
      <LanguageItem />
      <ThemeItem />
      <LinkItem
        title={lang.donate}
        withLatern={false}
        url={Route.donate}
        classes="navbar__nav-item--cta"
      />
    </ul>
  );
}

export default NavItems;
