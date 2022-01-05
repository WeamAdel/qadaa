import type { AppProps } from "next/app";
import "../styles/app.scss";
import LanguageProvider from "../Providers/Language";

import Theme from "../types/Theme";
import ThemeProvider from "../Providers/ThemeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Theme.light}>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
