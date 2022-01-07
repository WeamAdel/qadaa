import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";

interface TimesInterface {
  modalTitleId: string;
  modalDescId: string;
  closeModal: () => void;
}

function Times({ modalTitleId, modalDescId, closeModal }: TimesInterface) {
  return (
    <div className="prayer-times__times">
      <Box>
        <button
          className="prayer-times__close-btn close-button"
          title="Close prayer times"
          onClick={closeModal}
        >
          <ClearIcon />
        </button>
        <h2 id={modalTitleId} className="prayer-times__heading">
          Prayer Times
        </h2>
      </Box>
    </div>
  );
}

export default Times;
