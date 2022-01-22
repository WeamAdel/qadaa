import ExploreIcon from "@mui/icons-material/Explore";
import { TabHeadInterface } from "../../../types/Tabs";

function TabHead({ heading, description }: TabHeadInterface) {
  return (
    <div>
      <h2 className="tab__heading underlined-heading">{heading}</h2>
      <div className="tab__desc-wrapper">
        <div className="tab__icon">
          <ExploreIcon />
        </div>
        <p className="tab__desc">{description}</p>
      </div>
    </div>
  );
}

export default TabHead;
