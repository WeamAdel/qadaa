import { Menu } from "@mui/icons-material";
import { MouseEventHandler } from "react";

function ToggleButton({ toggleMenu }: { toggleMenu: MouseEventHandler }) {
  return (
    <button className="navbar__toggle-btn" title="Open menu" onClick={toggleMenu}>
      <Menu />
    </button>
  );
}

export default ToggleButton;
