import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Times from "./Times";
import ToggleButton from "./ToggleButton";

function PrayerTimes() {
  const [isOpen, setIsOpen] = useState(false);
  const modalDescId = "modal-modal-title";
  const modalTitleId = "modal-modal-description";

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <aside className="prayer-times">
      <ToggleButton openModal={openModal} />
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby={modalTitleId}
        aria-describedby={modalDescId}
        keepMounted={true}
      >
        <Box>
          <Times modalTitleId={modalTitleId} modalDescId={modalDescId} closeModal={closeModal} />
        </Box>
      </Modal>
    </aside>
  );
}

export default PrayerTimes;
