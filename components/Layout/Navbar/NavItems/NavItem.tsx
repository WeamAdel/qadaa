import LinkItem from "./Linktem";
import ButtonItem from "./ButtonItem";

import { Item, NavItem } from "../../../../types/NavItem";

const itemComponents = {
  [Item.link]: LinkItem,
  [Item.button]: ButtonItem,
};

function NavItem({ type, classes, ...props }: { type: Item; classes?: string; props: any }) {
  if (!itemComponents[type]) {
    throw Error("Invalid navitem type " + type);
  }

  const ItemComponent = itemComponents[type];

  return (
    <li className={`navbar__nav-item ${classes}`}>
      {/*// @ts-ignore */}
      <ItemComponent {...props} />
    </li>
  );
}

export default NavItem;
