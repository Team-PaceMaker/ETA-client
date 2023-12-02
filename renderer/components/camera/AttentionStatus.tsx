import TextButton from 'common/TextButton';
import FONT from 'constants/fonts';
import useInterval from 'hooks/useInterval';
import { useState } from 'react';
import styles from './video.module.css';

const GOOD_ATTENTION_TEXT = '오 잘하고 계신데요?';
const BAD_ATTENTION_TEXT = '잠시 휴식을 취해볼까요?';

const AttentionStatus = ({
  isAttention,
  handleStopRecord,
}: {
  isAttention: boolean;
  handleStopRecord: () => void;
}) => {
  const [timer, setTimer] = useState(0);

  useInterval(() => {
    setTimer((prev) => prev + 1);
  }, 1000);

  return (
    <div className={styles.videoBodyContainer}>
      <div style={FONT.HEADLINE1} className={styles.statusContainer}>
        최근 집중 상태
      </div>
      <div style={FONT.HEADLINE1} className={styles.attentionText}>
        {getHour(timer)}:{getMinute(timer)}:{getSecond(timer)}
      </div>
      <div className={styles.attentionStatus}>{isAttention ? '😎' : '🫵'}</div>
      <div style={FONT.BODY1} className={styles.attentionText}>
        {isAttention ? GOOD_ATTENTION_TEXT : BAD_ATTENTION_TEXT}
      </div>
      <TextButton onClick={handleStopRecord}>STOP ETA</TextButton>
    </div>
  );
};

const getHour = (second: number) => {
  const UNIT_HOUR = 60 * 60;
  const hour = Math.floor(second / UNIT_HOUR)
    .toString()
    .padStart(2, '0');
  return hour;
};

const getMinute = (second: number) => {
  const UNIT_MINUTE = 60;
  const minute = Math.floor(second / UNIT_MINUTE)
    .toString()
    .padStart(2, '0');
  return minute;
};

const getSecond = (second: number) => {
  const UNIT_MINUTE = 60;
  return (second % UNIT_MINUTE).toString().padStart(2, '0');
};

export default AttentionStatus;
