import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './result.module.css';
import RootLayout from '../RootLayout';
import { attentionState } from 'states/attention';
import { getStatisticResult } from 'apis/camera';
import PieChart from 'statistic/PieChart';
import FONT from 'constants/fonts';
import TextButton from 'common/TextButton';
import { IStatisticResult } from 'types/attention';

const ResultPage = () => {
  const [statisticResult, setStatisticResult] = useState<IStatisticResult>({} as IStatisticResult);

  const attentionId = useRecoilValue(attentionState);

  const getAttentionTimeSlots = () => {
    const slots = statisticResult?.attentionTimeSlots?.attentionSlots;
    if (slots) return '없음';
    return [slots].join(', '); // 11-12, 12-13
  };

  useEffect(() => {
    getStatisticResult(attentionId).then((res) => {
      setStatisticResult(res);
    });
  }, []);

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
            <div>{statisticResult.totalTime}</div>
          </div>
          <div className={styles.resultContainer}>
            <div>집중 시간 : </div>
            <div>{statisticResult.attentionTime}</div>
          </div>
          <div className={styles.resultContainer}>
            <div>집중 시간대 : {getAttentionTimeSlots()}</div>
            {/* <div>{statisticResult.attentionTimeSlots.attentionSlots[0]}</div> */}
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
