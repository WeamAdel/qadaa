import { useContext } from "react";
import NavItemComponent from "./NavItem";
import { NavItem, LinkNavItem, ButtonNavItem } from "../../../../models/NavItem";
import { LangContext } from "../../../Lang/Lang";

function changeTheme() {
  console.log("Theme changed");
}

function NavItems() {
  const lang = useContext(LangContext);

  const navItems: Array<NavItem> = [
    new LinkNavItem({ title: lang.about, withLatern: true, url: "/about" }),
    new LinkNavItem({ title: lang.secondLang, withLatern: true, url: "/ar" }),
    new ButtonNavItem({
      title: lang.secondLang,
      withLatern: false,
      onClick: changeTheme,
      icon: "",
    }),
    new LinkNavItem({
      title: lang.donate,
      withLatern: false,
      url: "/donate",
      classes: "navbar__nav-item--cta",
    }),
  ];

  const navItemsJSX = navItems.map((item: any, index: number) => {
    return <NavItemComponent key={"items" + index} {...item} />;
  });

  return <ul className="navbar__links-list">{navItemsJSX}</ul>;
}

export default NavItems;
