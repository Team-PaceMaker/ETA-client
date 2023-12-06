import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ipcRenderer } from 'electron';
import Image from 'next/image';
import styles from './login.module.css';
import { login } from 'apis/user';

const LoginPage = () => {
  const router = useRouter();
  const [authCode, setAuthCode] = useState('');

  ipcRenderer?.on('authCode', (event, arg) => {
    setAuthCode(arg);
  });

  const handleGoogleLogin = () => {
    ipcRenderer.send('kakaoLogin');
  };

  useEffect(() => {
    if (authCode) {
      login(authCode).then(() => {
        router.push('/home');
      });
    }
  }, [authCode]);
  return (
    <div className={styles.loginContainer}>
      <Image
        src={'/ETA_image/logo.png'}
        alt='ETA main logo'
        width={400}
        height={200}
        priority
      ></Image>
      <div className={styles.loginButton} onClick={handleGoogleLogin}>
        <Image
          src={'/ETA_image/kakao_login.png'}
          alt='kakao login button'
          width={450}
          height={70}
          priority
        ></Image>
      </div>
    </div>
  );
};

export default LoginPage;
