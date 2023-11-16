import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import FONT from '../../constants/fonts';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.headerContainer} style={FONT.BODY1}>
      <div className={styles.logo} onClick={() => router.push('/home')}>
        <Image src='/images/logo.png' width={80} height={40}></Image>
      </div>
      <div className={styles.login} onClick={() => router.push('/login')}>
        로그인
      </div>
    </div>
  );
};

export default Header;
