import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import { useEffect } from "react";
import getAPIPrayerTimes from "../../../api/prayer-times";

interface TimesInterface {
  modalTitleId: string;
  modalDescId: string;
  closeModal: () => void;
}

function Times({ modalTitleId, modalDescId, closeModal }: TimesInterface) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      const result = await getAPIPrayerTimes(long, lat);
      console.log(result);
    });
  }, []);

  return (
    <div className="prayer-times__times">
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
    </div>
  );
}

export default Times;
