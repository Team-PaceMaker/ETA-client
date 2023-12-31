import { getUserInfo } from 'apis/user';
import FONT from 'constants/fonts';
import LineChart from 'home/LineChart';
import RootLayout from 'pages/RootLayout';
import { useEffect, useState } from 'react';
import { IUser } from 'types/user';
import styles from './mypage.module.css';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<IUser>();

  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);

  return (
    <RootLayout>
      <div className={styles.mypageHeader}>
        <div style={FONT.HEADLINE1}>{userInfo?.name} 님</div>
        <div style={FONT.HEADLINE1}>최근 집중 상태 그래프입니다.</div>
      </div>
      <LineChart type='mypage' />
    </RootLayout>
  );
};

export default MyPage;
