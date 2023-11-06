import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './video.module.css';
import { getAttentionStatus } from '../../apis/camera';
import useInterval from '../../hooks/useInterval';
import RootLayout from '../RootLayout';
import FONT from '../../constants/fonts';

const GOOD_ATTENTION_TEXT = '오 잘하고 계신데요?';
const BAD_ATTENTION_TEXT = '잠시 휴식을 취해볼까요?';

const videoPage = () => {
  const [isAttention, setIsAttention] = useState(false);

  return (
    <RootLayout>
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
        <div className={styles.buttonContainer} style={FONT.BODY1}>
          STOP ETA
        </div>
      </div>
    </RootLayout>
  );
};

export default videoPage;
