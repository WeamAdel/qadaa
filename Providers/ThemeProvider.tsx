import { createContext, useEffect, useState } from "react";
import Theme from "../types/Theme";
import { getCachedTheme } from "../utils/functions";

export let ThemeContext = createContext({ theme: Theme.light, changeTheme: () => {} });

function Lang({ children }: { children: any }) {
  const [theme, setTheme] = useState(Theme.light);

  useEffect(() => {
    const savedTheme = getCachedTheme();
    const preferedTheme = getPreferredTheme();
    const theme = savedTheme || preferedTheme;

    if (theme && theme in Theme) {
      //@ts-ignore
      setTheme(theme);
    }
  }, []);

  useEffect(() => {
    updateTheme(theme);
    saveTheme(theme);
  }, [theme]);

  function changeTheme() {
    setTheme((theme: Theme) => {
      return theme === Theme.dark ? Theme.light : Theme.dark;
    });
  }

  return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}

function getPreferredTheme(): Theme | null {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return Theme.dark;
  }

  return null;
}

function saveTheme(theme: Theme) {
  console.log(theme);

  if (!(theme in Theme)) return;
  localStorage.setItem("theme", theme);
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

export default Lang;
