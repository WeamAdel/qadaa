import { MouseEventHandler } from "react";

export enum Item {
  link,
  button,
}

export interface NavItem {
  title: string;
  withLatern: boolean;
  classes?: string;
  type?: Item;
}

export interface LinkNavItem extends NavItem {
  url: string;
}

export interface ButtonNavItem extends NavItem {
  onClick: MouseEventHandler;
  icon?: Function | string;
}
