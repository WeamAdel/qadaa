import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Language from "../../../types/Language";
import Navbar from "../Navbar/Navbar";

interface PageInterface {
  title: string;
  alias?: string;
  children: any;
}

function Page({ title, alias, children }: PageInterface) {
  const { locale } = useRouter();

  useEffect(() => {
    setDocumentDirection(locale);
  }, [locale]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`page ${alias}`}>
        <div className="page__content">
          <Navbar />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

function setDocumentDirection(locale: string | undefined) {
  const dir = locale === Language.ar ? "rtl" : "ltr";
  document.body.setAttribute("dir", dir);
}

export default Page;
