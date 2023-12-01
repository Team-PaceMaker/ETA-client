import { useRouter } from 'next/router';
import styles from './landing.module.css';
import React, { useEffect } from 'react';

const LandingPage = () => {
  const router = useRouter();

  // setTimeout(() => {
  //   router.push('/login')
  // }, 2000)
  useEffect(() => {
    router.prefetch('/home'); // production 모드에서만 동작
    const timeout = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={styles.landingContainer}>
      <div className={styles.slogan}>
        <div id='slogan' className={styles.sloganText}>
          어제 미룬 업무
        </div>
        <div className={styles.sloganText}>&nbsp;&nbsp;&nbsp;&nbsp;ETA와 함께하자</div>
      </div>
    </div>
  );
};

export default LandingPage;
