import { createContext, useEffect, useState } from "react";
import Theme from "../types/Theme";

export let ThemeContext = createContext({ theme: Theme.light, changeTheme: () => {} });

function Lang({ children }: { children: any }) {
  const [theme, setTheme] = useState(Theme.light);

  useEffect(() => {
    const savedTheme = getCachedTheme();

    if (savedTheme && savedTheme in Theme) {
      //@ts-ignore
      setTheme(savedTheme);
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

/**
 * Gets previously chosen theme.
 */
function getCachedTheme(): string | null {
  return localStorage.getItem("theme");
}

function saveTheme(theme: Theme) {
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
