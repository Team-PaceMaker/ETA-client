import styles from './home.module.css';
import Link from 'next/link';
import RootLayout from '../RootLayout';
import TextButton from '@common/TextButton';
import LineChart from '@home/LineChart';

const HomePage = () => {
  return (
    <RootLayout>
      <div className={styles.homeContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>ETA와 하루를 시작해볼까요?</div>
          <div className={styles.subTitle}>최근 일주일 간 ETA와 함께한 시간입니다.</div>
        </div>
        <LineChart />
        <Link href='/camera'>
          <TextButton>START ETA</TextButton>
        </Link>
      </div>
    </RootLayout>
  );
};

export default HomePage;
