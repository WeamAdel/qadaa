import Head from "next/head";
import Navbar from "../Navbar/Navbar";

interface PageInterface {
  title: string;
  alias?: string;
  children: any;
}

function Page({ title, alias = "", children }: PageInterface) {
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

export default Page;
