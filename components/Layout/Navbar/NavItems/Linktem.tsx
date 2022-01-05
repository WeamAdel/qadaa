import Link from "next/link";
import { useRouter } from "next/router";
import Latern from "./Latern";

interface LinkItemInterface {
  title: string;
  withLatern: boolean;
  url: string;
  classes?: string;
}

function LinkItem({ title, withLatern, url, classes }: LinkItemInterface) {
  const laternJSX = withLatern ? <Latern /> : null;
  const { locale } = useRouter();

  return (
    <li className={`navbar__nav-item ${classes}`}>
      {laternJSX}
      <Link href={url} locale={locale}>
        {title}
      </Link>
    </li>
  );
}

export default LinkItem;
