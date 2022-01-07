import { ChevronLeft } from "@mui/icons-material";
import { MouseEventHandler } from "react";

interface OffCanvasInterface {
  children: any;
  isExpanded: boolean;
  closeMenu: MouseEventHandler;
}

function OffCanvas({ children, isExpanded, closeMenu }: OffCanvasInterface) {
  return (
    <div className="navbar__off-canvas" aria-expanded={isExpanded}>
      <div className="navbar__off-canvas-inner">
        <button
          className="navbar__close-btn close-button"
          onClick={closeMenu}
          title="Close navbar menu"
        >
          <ChevronLeft />
        </button>
        {/*//@ts-ignore */}
        {children}
      </div>
    </div>
  );
}

export default OffCanvas;
