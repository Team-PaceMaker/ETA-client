import styles from './result.module.css';
import RootLayout from '../RootLayout';
import PieChart from '../../components/Statistic/PieChart';
import FONT from '../../constants/fonts';
import Link from 'next/link';
import TextButton from '../../components/common/TextButton';

const BUTTON_TEXT = 'Home';

const ResultPage = () => {
  return (
    <RootLayout>
      <div className={styles.titleContainer}>
        <div className={styles.title} style={FONT.HEADLINE1}>
          오늘 하루도 고생하셨습니다 !
        </div>
        <div className={styles.subTitle}>얼마나 집중했는지 확인해볼까요?</div>
      </div>

      <div className={styles.resultBodyContainer}>
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
        <TextButton>HOME</TextButton>
      </Link>
    </RootLayout>
  );
};

export default ResultPage;
