import Link from "next/link";
import { useRouter } from "next/router";
import Latern from "./Latern";

interface LinkItemInterface {
  title: string;
  withLatern: boolean;
  url: string;
  classes?: string;
  id?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
}

function LinkItem({ title, withLatern, url, classes, id, target = "_self" }: LinkItemInterface) {
  const laternJSX = withLatern ? <Latern /> : null;
  const { locale } = useRouter();

  return (
    <li className={`navbar__nav-item ${classes}`}>
      {laternJSX}
      <Link href={url} locale={locale}>
        <a data-testid={id} target={target} rel="noreferrer">
          {title}
        </a>
      </Link>
    </li>
  );
}

export default LinkItem;
