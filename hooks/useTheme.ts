import { useEffect, useState } from "react";
import Theme from "../types/Theme";

function useTheme(init: Theme = Theme.light) {
  const [theme, setTheme] = useState(init);

  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  return { theme, setTheme };
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
