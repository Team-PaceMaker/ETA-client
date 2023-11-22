import FONT from 'constants/fonts';
import LineChart from 'home/LineChart';
import RootLayout from 'pages/RootLayout';
import styles from './mypage.module.css';

const MyPage = () => {
  return (
    <RootLayout>
      <div className={styles.mypageHeader}>
        <div style={FONT.HEADLINE1}>사용자 님</div>
        <div className={styles.badgeText}>뱃지를 획득해주세요</div>
        <div style={FONT.HEADLINE1}>현재 사용자님의 최근 7일간 집중 상태 그래프입니다.</div>
      </div>
      <LineChart />
    </RootLayout>
  );
};

export default MyPage;
