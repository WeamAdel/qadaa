import { useEffect, useState } from "react";
import Theme from "../types/Theme";

function useTheme(init: Theme = Theme.light): { theme: Theme; revertTheme: Function } {
  const [theme, setTheme] = useState(init);

  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  function revertTheme() {
    setTheme((theme) => {
      return theme === Theme.dark ? Theme.light : Theme.dark;
    });
  }

  return { theme, revertTheme };
}

/**
 * Updates the theme of the document to be dark.
 *
 * @param theme The selected theme
 */
function updateTheme(theme: Theme) {
  const body = document.body;

  if (body) body.setAttribute("theme", theme);
}

export default useTheme;
