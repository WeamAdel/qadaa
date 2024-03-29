import type { AppProps } from "next/app";
import "../styles/app.scss";
import LanguageProvider from "../Providers/Language";

import ThemeProvider from "../Providers/ThemeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
