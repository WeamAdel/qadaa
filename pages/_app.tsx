import type { AppProps } from "next/app";
import "../styles/app.scss";
import Lang from "../components/Lang/Lang";
import { Languages } from "../lang/lang";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Lang lang={Languages.en}>
      <Component {...pageProps} />
    </Lang>
  );
}

export default MyApp;
