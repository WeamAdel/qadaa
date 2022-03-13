import { useContext } from "react";
import { LangContext } from "../../../../Providers/Language";
import LinkItem from "./Linktem";
import ThemeItem from "./ThemeItem";
import LanguageItem from "./LanguageItem";
import Route from "../../../../settings/routes";

function NavItems() {
  const { home, donate } = useContext(LangContext);

  return (
    <ul className="navbar__links-list">
      <LinkItem title={home} withLatern={true} url={Route.home} id="nav-home" />
      <LanguageItem />
      <ThemeItem />
      <LinkItem
        title={donate}
        withLatern={false}
        url={Route.donate}
        classes="navbar__nav-item--cta"
        id="nav-donate"
      />
    </ul>
  );
}

export default NavItems;
