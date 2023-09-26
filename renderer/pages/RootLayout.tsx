import Head from "next/head";
import React from "react";
import Header from "../components/common/Header";

const RootLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>ETA(Encourage Time for Attention)</title>
      </Head>
      <Header />
      <>{children}</>
    </div>
  );
};

export default RootLayout;
