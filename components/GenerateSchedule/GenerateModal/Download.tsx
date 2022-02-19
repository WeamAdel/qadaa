import { CheckCircleRounded, DownloadRounded } from "@mui/icons-material";
import PrimaryIconButton from "../../Buttons/PrimaryIconButton";
import Icon from "../../Icon/Icon";

interface Download {
  save: () => void;
}

function Download({ save }: Download) {
  return (
    <div className="generate-modal__content generate-modal__content--download" role="alert">
      <Icon classes="generate-modal__icon">
        <CheckCircleRounded fontSize="large" />
      </Icon>
      <p className="generate-modal__desc">Schedule Generated Successfully</p>
      <PrimaryIconButton title="Download PDF" onClick={save}>
        <DownloadRounded fontSize="small" />
      </PrimaryIconButton>
    </div>
  );
}

export default Download;
