import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Logo from "./Logo";
import { isRTLLang } from "../../../lang/lang";
import { useRouter } from "next/router";
import NavItems from "./NavItems/NavItems";

function Navbar() {
  const { locale } = useRouter();

  //@ts-ignore
  const chevronIcon = isRTLLang(locale) ? <ChevronLeftIcon /> : <ChevronRightIcon />;

  return (
    <header>
      <nav className="navbar">
        <Logo />
        <NavItems />
      </nav>
    </header>
  );
}

export default Navbar;
