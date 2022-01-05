import { createContext } from "react";
import Theme from "../types/Theme";

export let ThemeContext = createContext(Theme.light);

function Lang({ children, theme = Theme.light }: { children: any; theme: Theme }) {
  ThemeContext = createContext(theme);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export default Lang;
