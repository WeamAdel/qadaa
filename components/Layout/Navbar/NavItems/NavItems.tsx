import { useContext } from "react";
import NavItemComponent from "./NavItem";

import NavItem from "../../../../models/NavItem";
import { LangContext } from "../../../Lang/Lang";

function NavItems() {
  const lang = useContext(LangContext);

  const navItems: Array<NavItem> = [
    new NavItem({ title: lang.about, withLatern: true, url: "/about" }),
    new NavItem({ title: lang.secondLang, withLatern: true, url: "/ar" }),
    new NavItem({ title: lang.donate, withLatern: false, url: "/donate" }),
  ];

  const navItemsJSX = navItems.map((item: NavItem) => {
    return <NavItemComponent key={item.url} {...item} />;
  });

  return <ul className="navbar__links-list">{navItemsJSX}</ul>;
}

export default NavItems;
