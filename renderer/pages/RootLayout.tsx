import Head from "next/head";
import React from "react";
import Header from "../components/common/Header";
import styles from "./global.module.css";

const RootLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>ETA(Encourage Time for Attention)</title>
      </Head>
      <Header />
      <>{children}</>
    </div>
  );
};

export default RootLayout;
