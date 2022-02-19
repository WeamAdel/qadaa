import { MouseEventHandler } from "react";
import ClearIcon from "@mui/icons-material/Clear";

interface CloseButton {
  title: string;
  closeModal: MouseEventHandler;
  classes?: string;
  testid?: string;
}

function CloseButton({ title, closeModal, classes = "", testid = "" }: CloseButton) {
  return (
    <button
      className={`close-button ${classes}`}
      title={title}
      onClick={closeModal}
      data-testid={testid}
    >
      <ClearIcon />
    </button>
  );
}

export default CloseButton;
