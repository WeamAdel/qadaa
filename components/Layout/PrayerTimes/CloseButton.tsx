import { MouseEventHandler } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function CloseButton({ closeModal }: { closeModal: MouseEventHandler }) {
  return (
    <button
      className="prayer-times__close-btn close-button"
      title="Close prayer times"
      onClick={closeModal}
    >
      <ClearIcon />
    </button>
  );
}

export default CloseButton;
