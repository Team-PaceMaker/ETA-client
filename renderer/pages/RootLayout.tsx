import Head from 'next/head';
import React from 'react';
import Header from '../components/common/Header';
import styles from './landing.module.css';

const RootLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>ETA(Encourage Time for Attention)</title>
      </Head>
      <Header />
      <div className={styles.rootLayout}>{children}</div>
    </>
  );
};

export default RootLayout;
