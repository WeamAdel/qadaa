import { Box, Modal } from "@mui/material";
import { useState } from "react";
import CloseButton from "../../Buttons/CloseButton";
import Download from "./Download";
import Loading from "./Loading";

interface GenerateModal {
  isGenerated: boolean;
  download: () => void;
  resetSchedule: () => void;
}

function GenerateModal({ isGenerated, download, resetSchedule }: GenerateModal) {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
    resetSchedule();
  }

  return (
    <Modal open={isOpen}>
      <Box>
        <div>
          <CloseButton
            closeModal={closeModal}
            title="Close download modal"
            testid="generate-modal-close-btn"
          />
          <div className="generate-modal modal">
            {isGenerated ? <Download download={download} /> : <Loading />}
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default GenerateModal;
