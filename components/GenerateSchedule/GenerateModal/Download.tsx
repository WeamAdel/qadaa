import { CheckCircleRounded, DownloadRounded } from "@mui/icons-material";
import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import PrimaryIconButton from "../../Buttons/PrimaryIconButton";
import Icon from "../../Icon/Icon";

interface Download {
  download: () => void;
}

function Download({ download }: Download) {
  const { scheduleGenerated, downloadSchedule, blockedDownload } = useContext(LangContext);

  return (
    <div
      className="generate-modal__content generate-modal__content--download"
      role="alert"
      data-testid="download-schedule"
    >
      <Icon classes="generate-modal__icon">
        <CheckCircleRounded fontSize="large" />
      </Icon>
      <p className="generate-modal__desc" data-testid="download-schedule-desc">
        {scheduleGenerated}
      </p>
      <PrimaryIconButton title={downloadSchedule} onClick={download} testId="download-schedule-btn">
        <DownloadRounded fontSize="small" />
      </PrimaryIconButton>
      <p className="generate-modal__blocked-download">{blockedDownload}</p>
    </div>
  );
}

export default Download;
