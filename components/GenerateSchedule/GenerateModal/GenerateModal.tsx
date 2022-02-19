import { Box, Modal } from "@mui/material";
import Download from "./Download";
import Loading from "./Loading";

interface GenerateModal {
  open: boolean;
  isGenerated: boolean;
  save: () => void;
}

function GenerateModal({ open, isGenerated, save }: GenerateModal) {
  console.log("is generated? ", isGenerated);
  return (
    <Modal open={open}>
      <Box>
        <div className="generate-modal modal">
          {isGenerated ? <Download save={save} /> : <Loading />}
        </div>
      </Box>
    </Modal>
  );
}

export default GenerateModal;
