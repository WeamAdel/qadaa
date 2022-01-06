import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Logo from "./Logo";
import { isRTLLang } from "../../../lang/lang";
import { useRouter } from "next/router";
import NavItems from "./NavItems/NavItems";
import OffCanvas from "./OffCanvas";
import ToggleButton from "./ToggleButton";
import { useState } from "react";

function Navbar() {
  const { locale } = useRouter();
  const [isExpanded, setIspanded] = useState(false);

  //@ts-ignore
  const chevronIcon = isRTLLang(locale) ? <ChevronLeftIcon /> : <ChevronRightIcon />;

  function toggleMenu() {
    setIspanded((isExpanded) => {
      return !isExpanded;
    });
  }

  function closeMenu() {
    console.log("test");

    setIspanded(false);
  }

  return (
    <header>
      <div className="navbar">
        <Logo />
        <ToggleButton toggleMenu={toggleMenu} />
        <OffCanvas isExpanded={isExpanded} closeMenu={closeMenu}>
          <NavItems />
        </OffCanvas>
      </div>
    </header>
  );
}

export default Navbar;
