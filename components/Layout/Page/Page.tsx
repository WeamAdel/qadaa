import Head from "next/head";

function Page(props: any) {
  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
      </Head>
      <main>{props.children}</main>
    </div>
  );
}

export default Page;
