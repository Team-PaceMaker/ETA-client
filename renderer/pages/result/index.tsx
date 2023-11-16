import Link from 'next/link';
import { useState } from 'react';
import styles from './result.module.css';
import RootLayout from '../RootLayout';
import PieChart from '../../components/Statistic/PieChart';
import FONT from '../../constants/fonts';
import TextButton from '../../components/common/TextButton';

interface IStatisticResult {
  totalTime: Date;
  focusTime: Date;
  focusTimeZone: string;
}

const ResultPage = () => {
  const [statisticResult, setStatisticResult] = useState<IStatisticResult>({
    totalTime: new Date('2023-11-16T00:00:00Z'),
    focusTime: new Date('2023-11-16T00:00:00Z'),
    focusTimeZone: '10-11시',
  });

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
            <div>{statisticResult.totalTime.toTimeString().split(' ')[0]}</div>
          </div>
          <div className={styles.resultContainer}>
            <div>집중 시간 : </div>
            <div>{statisticResult.focusTime.toTimeString().split(' ')[0]}</div>
          </div>
          <div className={styles.resultContainer}>
            <div>집중 시간대 : </div>
            <div>{statisticResult.focusTimeZone}</div>
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
