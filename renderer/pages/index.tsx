import { useRouter } from 'next/router';
import styles from './landing.module.css';
import React, { useEffect } from 'react';
import RootLayout from './RootLayout';

const LandingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/home'); // production 모드에서만 동작
    const timeout = setTimeout(() => {
      router.push('/home');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <RootLayout>
      <div className={styles.landingContainer}>
        <div className={styles.slogan}>
          <div id='slogan' className={styles.sloganText}>
            어제 미룬 업무
          </div>
          <div className={styles.sloganText}>&nbsp;&nbsp;&nbsp;&nbsp;ETA와 함께하자 !</div>
        </div>
      </div>
    </RootLayout>
  );
};

export default LandingPage;
