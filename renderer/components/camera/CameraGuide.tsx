import TextButton from 'common/TextButton';
import COLOR from 'constants/colors';
import FONT from 'constants/fonts';
import { useEffect } from 'react';
import styles from './camera.module.css';

const VIDEO_WIDTH = 600;
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
  const handleDrawGuide = () => {
    const canvas: HTMLCanvasElement = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    // 머리
    ctx.beginPath();
    ctx.strokeStyle = COLOR.GREEN;
    ctx.lineWidth = 10;
    ctx.setLineDash([10, 10]);
    ctx.arc(300, 200, 130, 0, Math.PI * 2); // (x, y, 반지름, 시작 각도, 종료 각도)
    ctx.stroke();

    // 몸통
    ctx.beginPath();
    ctx.arc(300, 580, 250, 0, 90);
    ctx.stroke();
  };

  useEffect(() => {
    if ('navigator' in window) {
      handleDrawGuide();
    }
  }, []);

  return (
    <div className={isStartRecord ? styles.none : styles.cameraBodyContainer}>
      <video id='video-output' width={VIDEO_WIDTH} className={styles.video} />
      {!isVideoLoaded && <div className={styles.loadingBlock} />}

      <div className={styles.videoText} style={FONT.BODY1}>
        {VIDEO_TEXT}
      </div>
      <canvas className={styles.canvas} id='canvas' width='600px' height='450px'></canvas>
      <TextButton onClick={handleStartRecord}>VIDEO START</TextButton>
    </div>
  );
};

export default CameraGuide;
