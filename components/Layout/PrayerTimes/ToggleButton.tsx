import Image from "next/image";
import { MouseEventHandler } from "react";

function ToggleButton({ openModal }: { openModal: MouseEventHandler }) {
  return (
    <button
      className="prayer-times__toggle-btn"
      title="Show prayer times."
      onClick={openModal}
      data-testid="prayer-times-open-btn"
    >
      <div className="prayer-times__ribble-outer" role="presentation">
        <div className="prayer-times__ribble-inner">
          <div className="prayer-times__ribble-core">
            <Image width="100%" height="100%" src="/images/mosque.svg" alt="Mosque" />
          </div>
        </div>
      </div>
    </button>
  );
}

export default ToggleButton;
