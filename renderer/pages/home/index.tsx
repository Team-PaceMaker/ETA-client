import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import LineChart from '../../components/Home/LineChart';
import Link from 'next/link';
import RootLayout from '../RootLayout';
import FONT from '../../constants/fonts';

const BUTTON_TEXT = 'START ETA';

const HomePage = () => {
  return (
    <RootLayout>
      <div className={styles.homeContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>ETA와 하루를 시작해볼까요?</div>
          <div className={styles.subTitle}>최근 일주일 간 ETA와 함께한 시간입니다.</div>
        </div>
        <LineChart />
        <Link href='/camera'>
          <div className={styles.buttonContainer} style={FONT.BODY1}>
            {BUTTON_TEXT}
          </div>
        </Link>
      </div>
    </RootLayout>
  );
};

export default HomePage;
