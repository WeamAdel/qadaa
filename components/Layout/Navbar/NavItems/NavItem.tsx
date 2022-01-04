import Link from "next/link";
import NavItem from "../../../../types/NavItem";
import Latern from "./Latern";

function NavItem({ title, url, withLatern }: NavItem) {
  const laternJSX = withLatern ? <Latern /> : null;

  return (
    <li className="navbar__nav-item">
      {laternJSX}
      <Link href={url}>{title}</Link>
    </li>
  );
}

export default NavItem;
