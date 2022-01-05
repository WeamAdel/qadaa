import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "../Icon/Icon";

interface PrimaryIconLinkButtonInterface {
  title: string;
  url: string;
  children: any;
  classes?: string;
}

function PrimaryIconLinkButton({ title, url, children, classes }: PrimaryIconLinkButtonInterface) {
  const { locale } = useRouter();
  return (
    <div className={`button--link button--link--primary button--icon ${classes}`}>
      <Link href={url} locale={locale}>
        <a>
          <Icon>{children}</Icon>
          {title}
        </a>
      </Link>
    </div>
  );
}

export default PrimaryIconLinkButton;
