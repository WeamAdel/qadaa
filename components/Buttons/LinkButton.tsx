import Link from "next/link";
import useMyRouter from "../../hooks/useMyRouter";
import ButtonCategory from "../../types/ButtonCategory";
import Icon from "../Icon/Icon";

interface PrimaryIconLinkButtonInterface {
  title: string;
  url: string;
  category?: ButtonCategory;
  children?: any;
  classes?: string;
}

function LinkButton({
  title,
  url,
  children,
  category = ButtonCategory.Primary,
  classes = "",
}: PrimaryIconLinkButtonInterface) {
  const { locale } = useMyRouter();
  const iconJSX = children ? <Icon>{children}</Icon> : null;

  return (
    <div
      className={`button--link button--link--${category} ${
        children ? "button--icon" : ""
      } ${classes}`}
    >
      <Link href={url} locale={locale}>
        <a>
          {iconJSX}
          {title}
        </a>
      </Link>
    </div>
  );
}

export default LinkButton;
