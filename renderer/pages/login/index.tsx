import React from 'react';
import RootLayout from '../RootLayout';
import electron, { ipcRenderer } from 'electron';

// console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // "pong"이 출력됩니다.

// ipcRenderer.on('authCode', (event, arg) => {
//   console.log('authCode :', arg); // "pong"이 출력됩니다.
// });

const LoginPage = () => {
  const handleGoogleLogin = () => {
    ipcRenderer.send('googleLogin', 'ping');
    ipcRenderer.on('authCode', (event, arg) => {
      console.log('authCode :', arg); // "pong"이 출력됩니다.
    });
  };
  return (
    <RootLayout>
      <div>LoginPage</div>
      <button onClick={handleGoogleLogin}>구글 로그인</button>
    </RootLayout>
  );
};

export default LoginPage;
