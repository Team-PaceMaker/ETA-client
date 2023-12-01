import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ipcRenderer } from 'electron';
import Image from 'next/image';
import styles from './login.module.css';

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
    <div className={styles.loginContainer}>
      <Image src='/images/logo.png' alt='ETA main logo' width={400} height={200} priority></Image>
      <div className={styles.loginButton} onClick={handleGoogleLogin}>
        <Image
          src='/images/google.png'
          alt='google login button'
          width={300}
          height={70}
          priority
        ></Image>
      </div>
    </div>
  );
};

export default LoginPage;
