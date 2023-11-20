import styles from './video.module.css';
import FONT from '../../constants/fonts';
import Link from 'next/link';
import TextButton from '../common/TextButton';

const GOOD_ATTENTION_TEXT = '오 잘하고 계신데요?';
const BAD_ATTENTION_TEXT = '잠시 휴식을 취해볼까요?';

const AttentionStatus = ({
  isAttention,
  timer,
  handleStopRecord,
}: {
  isAttention: boolean;
  timer: number;
  handleStopRecord: () => void;
}) => {
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
      <Link href='/result'>
        <TextButton onClick={handleStopRecord}>STOP ETA</TextButton>
      </Link>
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
