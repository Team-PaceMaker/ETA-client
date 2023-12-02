import { logout } from 'apis/user';
import FONT from 'constants/fonts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className={styles.headerContainer} style={FONT.BODY1}>
      <div className={styles.logo} onClick={() => router.push('/home')}>
        <Image src='/images/logo.png' width={80} height={40}></Image>
      </div>
      {/* <div className={styles.login} onClick={() => router.push('/login')}>
        로그인
      </div> */}
      <div style={{ display: 'flex', gap: 20 }}>
        <div className={styles.mypage} onClick={() => router.push('/mypage')}>
          마이페이지
        </div>
        <div className={styles.logout} onClick={handleLogout}>
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default Header;
