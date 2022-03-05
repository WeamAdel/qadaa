import { CheckCircleRounded, DownloadRounded } from "@mui/icons-material";
import { useContext } from "react";
import { LangContext } from "../../../Providers/Language";
import PrimaryIconButton from "../../Buttons/PrimaryIconButton";
import Icon from "../../Icon/Icon";

interface Download {
  download: () => void;
}

function Download({ download }: Download) {
  const { scheduleGenerated, downloadSchedule } = useContext(LangContext);

  return (
    <div className="generate-modal__content generate-modal__content--download" role="alert">
      <Icon classes="generate-modal__icon">
        <CheckCircleRounded fontSize="large" />
      </Icon>
      <p className="generate-modal__desc">{scheduleGenerated}</p>
      <PrimaryIconButton title={downloadSchedule} onClick={download}>
        <DownloadRounded fontSize="small" />
      </PrimaryIconButton>
    </div>
  );
}

export default Download;
