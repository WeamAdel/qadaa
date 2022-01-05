import {
  NavItem as NavItemInterface,
  LinkNavItem as LinkNavItemInterface,
  ButtonNavItem as ButtonNavItemInterface,
  Item,
} from "../types/NavItem";

export class NavItem implements NavItemInterface {
  title;
  withLatern;
  type;
  classes?: string | undefined;

  constructor({ title, withLatern, type, classes }: NavItemInterface) {
    this.title = title;
    this.withLatern = withLatern;
    this.type = type;
    this.classes = classes || "";
  }
}

export class LinkNavItem extends NavItem implements LinkNavItemInterface {
  url;
  constructor({ title, withLatern, classes, url }: LinkNavItemInterface) {
    super({ title, withLatern, type: Item.link, classes });
    this.url = url;
  }
}

export class ButtonNavItem extends NavItem implements ButtonNavItemInterface {
  onClick;
  icon;

  constructor({ title, withLatern, classes, onClick, icon }: ButtonNavItemInterface) {
    super({ title, withLatern, type: Item.button, classes });
    this.onClick = onClick;
    this.icon = icon;
  }
}
