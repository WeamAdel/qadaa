import Link from "next/link";
import { LinkNavItem } from "../../../../types/NavItem";
import Latern from "./Latern";

function LinkItem({ title, withLatern, url }: LinkNavItem) {
  const laternJSX = withLatern ? <Latern /> : null;

  return (
    <>
      {laternJSX}
      <Link href={url}>{title}</Link>
    </>
  );
}

export default LinkItem;
