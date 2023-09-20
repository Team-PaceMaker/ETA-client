import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <Image src="/images/logo.png" alt="Logo image" width={100} height={100} />
      </div>
    </React.Fragment>
  );
}

export default Home;
