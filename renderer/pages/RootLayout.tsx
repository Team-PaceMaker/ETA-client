import Head from 'next/head';
import React from 'react';
import Header from '../components/common/Header';
import styles from './landing.module.css';

const RootLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>ETA(Encourage Time for Attention)</title>
        <meta
          name='description'
          content={'장시간 노트북 작업하는 현대인을 위한 딥러닝 기반 집중력 관리 서비스'}
        />
      </Head>
      <Header />
      <div className={styles.rootLayout}>{children}</div>
    </>
  );
};

export default RootLayout;
