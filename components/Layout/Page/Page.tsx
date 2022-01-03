import Head from "next/head";
import Navbar from "../Navbar/Navbar";

function Page(props: any) {
  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>{props.children}</main>
    </div>
  );
}

export default Page;
