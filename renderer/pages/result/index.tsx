import styles from './result.module.css';
import RootLayout from '../RootLayout';
import PieChart from '../../components/Statistic/PieChart';
import FONT from '../../constants/fonts';
import Link from 'next/link';

const BUTTON_TEXT = 'Home';

const ResultPage = () => {
  return (
    <RootLayout>
      <div className={styles.mainText} style={FONT.HEADLINE1}>
        오늘 하루도 고생하셨습니다!!!
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 100 }}>
        <PieChart />
        <div className={styles.statisticContainer} style={FONT.HEADLINE1}>
          <div className={styles.resultContainer}>
            <div>ETA 사용 시간 : </div>
            <div>00:00:00</div>
          </div>
          <div className={styles.resultContainer}>
            <div>집중 시간 : </div>
            <div>00:00:00</div>
          </div>
          <div className={styles.resultContainer}>
            <div>집중 시간대 : </div>
            <div>10-11시</div>
          </div>
        </div>
      </div>
      <Link href='/home'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={styles.buttonContainer} style={FONT.BODY1}>
            {BUTTON_TEXT}
          </div>
        </div>
      </Link>
    </RootLayout>
  );
};

export default ResultPage;
