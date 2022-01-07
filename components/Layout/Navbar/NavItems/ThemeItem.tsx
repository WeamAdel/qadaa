import { useContext } from "react";
import { LangContext } from "../../../../Providers/Language";
import Theme from "../../../../types/Theme";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../../../../Providers/ThemeProvider";

function ButtonItem() {
  const { theme, changeTheme } = useContext(ThemeContext);
  const { changeToDarkTheme, changeToLightTheme } = useContext(LangContext);

  const btnVariants = {
    [Theme.light]: {
      icon: DarkModeIcon,
      title: changeToDarkTheme,
    },
    [Theme.dark]: {
      icon: LightModeIcon,
      title: changeToLightTheme,
    },
  };

  const Icon = btnVariants[theme].icon;
  return (
    <li className={`navbar__nav-item`}>
      {/*//@ts-ignore*/}
      <button onClick={changeTheme} className="navbar__btn-item" title={btnVariants[theme].title}>
        <Icon />
      </button>
    </li>
  );
}

export default ButtonItem;
