import Link from 'next/link';
import React, { useState } from 'react';
import styles from './camera.module.css';
import FONT from '../../constants/fonts';
import cn from 'classnames';
import TextButton from '../common/TextButton';

const VIDEO_WIDTH = 600;

const BUTTON_TEXT = 'VIDEO START';
const VIDEO_TEXT = '보이는 점선에 맞춰 촬영해주세요';

const CameraGuide = ({
  isVideoLoaded,
  isStartRecord,
  handleStartRecord,
}: {
  isVideoLoaded: boolean;
  isStartRecord: boolean;
  handleStartRecord: () => void;
}) => {
  return (
    <div className={isStartRecord ? styles.none : styles.cameraBodyContainer}>
      <video id='video-output' width={VIDEO_WIDTH} className={styles.video} />
      {!isVideoLoaded && <div className={styles.loadingBlock} />}

      <div className={styles.videoText} style={FONT.BODY1}>
        {VIDEO_TEXT}
      </div>
      <TextButton onClick={handleStartRecord}>VIDEO START</TextButton>
    </div>
  );
};

export default CameraGuide;
