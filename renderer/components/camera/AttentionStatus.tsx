import styles from './video.module.css';
import FONT from '../../constants/fonts';
import Link from 'next/link';

const GOOD_ATTENTION_TEXT = '오 잘하고 계신데요?';
const BAD_ATTENTION_TEXT = '잠시 휴식을 취해볼까요?';

const AttentionStatus = ({ isAttention }: { isAttention: boolean }) => {
  return (
    <div className={styles.videoBodyContainer}>
      <div style={FONT.BODY1} className={styles.statusContainer}>
        오늘의 집중 상태
      </div>
      <div style={FONT.BODY1} className={styles.attentionText}>
        03h 23m
      </div>
      <div className={styles.attentionStatus}>{isAttention ? '🥴' : '🫵'}</div>
      <div style={FONT.BODY1} className={styles.attentionText}>
        {isAttention ? GOOD_ATTENTION_TEXT : BAD_ATTENTION_TEXT}
      </div>
      <Link href='/result'>
        <div className={styles.buttonContainer} style={FONT.BODY1}>
          STOP ETA
        </div>
      </Link>
    </div>
  );
};

export default AttentionStatus;
