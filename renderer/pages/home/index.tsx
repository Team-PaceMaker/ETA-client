import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import LineChart from '../../components/Home/LineChart';
import Link from 'next/link';
import RootLayout from '../RootLayout';
import FONT from '../../constants/fonts';

const BUTTON_TEXT = 'START ETA';

const Home = () => {
  return (
    <RootLayout>
      <div style={FONT.SLOGAN} className={styles.slogan}>
        <div id='slogan' className={styles.sloganText}>
          어제 미룬 업무
        </div>
        <div className={styles.sloganText}>ETA와 함께하자</div>
      </div>
      <div className={styles.bodyContainer}>
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

export default Home;
