import TextButton from 'common/TextButton';
import FONT from 'constants/fonts';
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
    const canvas: HTMLCanvasElement = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');
  };

  return (
    <div className={isStartRecord ? styles.none : styles.cameraBodyContainer}>
      <video id='video-output' width={VIDEO_WIDTH} className={styles.video} />
      {!isVideoLoaded && <div className={styles.loadingBlock} />}

      <div className={styles.videoText} style={FONT.BODY1}>
        {VIDEO_TEXT}
      </div>
      <canvas className={styles.canvas} id='cv1' width='600px' height='450px'></canvas>
      <TextButton onClick={handleStartRecord}>VIDEO START</TextButton>
    </div>
  );
};

export default CameraGuide;
