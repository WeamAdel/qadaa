import NavItemInterface from "../types/NavItem";

class NavItem implements NavItemInterface {
  title;
  withLatern;
  url;

  constructor({ title, withLatern, url }: NavItemInterface) {
    this.title = title;
    this.withLatern = withLatern;
    this.url = url;
  }
}

export default NavItem;
