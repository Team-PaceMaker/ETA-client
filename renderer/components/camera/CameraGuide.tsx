import Link from 'next/link';
import React, { useState } from 'react';
import styles from './camera.module.css';
import FONT from '../../constants/fonts';

const VIDEO_WIDTH = 600;

const BUTTON_TEXT = 'VIDEO START';
const VIDEO_TEXT = '보이는 점선에 맞춰 촬영해주세요';

const CameraGuide = ({ isVideoLoaded }: { isVideoLoaded: boolean }) => {
  return (
    <div className={styles.cameraBodyContainer}>
      <video id='video-output' width={VIDEO_WIDTH} className={styles.video} />
      {!isVideoLoaded && <div className={styles.loadingBlock} />}

      <div className={styles.videoText} style={FONT.BODY1}>
        {VIDEO_TEXT}
      </div>
      <Link href='/video'>
        <div className={styles.buttonContainer} style={FONT.BODY1}>
          {BUTTON_TEXT}
        </div>
      </Link>
      {/* <button onClick={captureImage}>캡쳐하기</button> */}
      {/* <div id="output" className={styles.output}></div> */}
      {/* <img src={imageSrc} width={IMAGE_WIDTH} height={IMAGE_HEIGHT}></img> */}
    </div>
  );
};

export default CameraGuide;
