import Logo from "./Logo";
import NavItems from "./NavItems/NavItems";
import OffCanvas from "./OffCanvas";
import ToggleButton from "./ToggleButton";
import { useState } from "react";

function Navbar() {
  const [isExpanded, setIspanded] = useState(false);

  function toggleMenu() {
    setIspanded((isExpanded) => {
      return !isExpanded;
    });
  }

  function closeMenu() {
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
