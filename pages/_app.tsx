import type { AppProps } from "next/app";
import "../styles/app.scss";
import Lang from "../components/Lang/Lang";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Lang>
      <Component {...pageProps} />
    </Lang>
  );
}

export default MyApp;
