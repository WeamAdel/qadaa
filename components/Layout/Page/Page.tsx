import Head from "next/head";
import Navbar from "../Navbar/Navbar";

function Page(props: any) {
  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <div className="page">
        <div className="page__content">
          <Navbar />
          <main>{props.children}</main>
        </div>
      </div>
    </div>
  );
}

export default Page;
