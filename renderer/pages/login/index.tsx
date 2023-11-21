import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ipcRenderer } from 'electron';
import Image from 'next/image';
import styles from './login.module.css';
import RootLayout from '../RootLayout';
import FONT from '@constants/fonts';

const LoginPage = () => {
  const router = useRouter();
  const [authCode, setAuthCode] = useState('');

  ipcRenderer?.on('authCode', (event, arg) => {
    setAuthCode(arg);
  });

  const handleGoogleLogin = () => {
    ipcRenderer.send('googleLogin');
  };

  useEffect(() => {
    // TODO: login API 연동
    // TODO: 로그인 정보가 있을 경우 자동 로그인
    // login(authCode).then(() => {
    //   router.push('/');
    // });
    if (authCode) {
      router.push('/home');
    }
  }, [authCode]);
  return (
    // <RootLayout>
    <div className={styles.loginContainer}>
      {/* <div style={FONT.HEADLINE1}>집중시간에 따라 통계를 제공해드려요</div> */}
      <Image src='/images/logo.png' width={400} height={200}></Image>
      <div className={styles.loginButton} onClick={handleGoogleLogin}>
        <Image src='/images/google.png' width={300} height={70}></Image>
      </div>
    </div>
    // </RootLayout>
  );
};

export default LoginPage;
