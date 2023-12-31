import { getAttentionStatus, getPushAlarmStatus } from 'apis/camera';
import TextButton from 'common/TextButton';
import FONT from 'constants/fonts';
import useInterval from 'hooks/useInterval';
import { useEffect, useState } from 'react';
import { showNotification } from 'utils/notification';
import styles from './video.module.css';

const GOOD_ATTENTION_TEXT = '오 잘하고 계신데요?';
const BAD_ATTENTION_TEXT = '잠시 휴식을 취해볼까요?';
const TIMER_DELAY = 1000;
const CAPTURE_DELAY = 2000;
const PUSH_ALARM_DELAY = 30000;
let scaleFactor = 0.25;

const constraints = { audio: false, video: true };
let videoStream: MediaStream;

const AttentionStatus = ({
  attentionId,
  handleStopRecord,
}: {
  attentionId: number;
  handleStopRecord: () => void;
}) => {
  const [timer, setTimer] = useState(0);
  const [isAttention, setIsAttention] = useState(false);

  const capture = (video: HTMLVideoElement, scaleFactor: number) => {
    if (scaleFactor == null) {
      scaleFactor = 1;
    }
    var w = video.videoWidth * scaleFactor;
    var h = video.videoHeight * scaleFactor;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.scale(-1, 1);
    ctx.translate(-w, 0);
    ctx.drawImage(video, 0, 0, w, h);

    return canvas;
  };

  const captureImage = async () => {
    const video = document.getElementById('video-output-2') as HTMLVideoElement;
    // const output = document.getElementById('output');
    const canvas = capture(video, scaleFactor);
    if (canvas.width === 0) return;
    const imageSrc = canvas.toDataURL('image/jpeg', 0.8); // 2번째 인자를 0~1 까지 주면서 화질 조절. 1이 best
    // Base64 문자열을 Blob으로 변환
    const blob = dataURLtoBlob(imageSrc);
    // Blob 데이터를 FormData에 담아 송신
    const formData = new FormData();
    formData.append('image', blob, 'test.jpeg');
    formData.append('attentionId', attentionId.toString());

    const attention = await getAttentionStatus(formData);
    if (attention) setIsAttention(true);
    else setIsAttention(false);
  };

  const showCameraGuide = () => {
    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
      const videoOutput = document.getElementById('video-output-2');
      if (videoOutput instanceof HTMLVideoElement) {
        videoOutput.srcObject = mediaStream;
        videoStream = mediaStream;
        // metadata가 로드될 때 실행되는 이벤트
        videoOutput.onloadedmetadata = function () {
          videoOutput.play();
        };
      }
    });
  };

  // useInterval(() => {
  //   getPushAlarmStatus(attentionId).then((attentionStatus) => {
  //     console.log('getPushAlarmStatus : ', attentionStatus);
  //     showNotification(attentionStatus);
  //   });
  // }, PUSH_ALARM_DELAY);

  // 일정간격마다 비디오 캡처
  useInterval(() => {
    captureImage();
  }, CAPTURE_DELAY);

  useInterval(() => {
    setTimer((prev) => prev + 1);
  }, TIMER_DELAY);

  useEffect(() => {
    if ('navigator' in window) {
      showCameraGuide();
    }
  }, []);

  const handlePushAlarm = () => {
    getPushAlarmStatus(attentionId).then((attentionStatus) => {
      console.log('getPushAlarmStatus : ', attentionStatus);
      // showNotification(attentionStatus);
      if (Notification.permission === 'granted') {
        if (attentionStatus) {
          // TODO: 집중상태를 값으로 받아서 값에 따라 푸시알림 보내기
          const notificationTitle = '현재 집중상태 : 🔥';
          new Notification(notificationTitle, {
            body: '열심히 하고계시네요! 아자아자!',
          }).onclick = () => console.log('Notification Clicked');
        } else {
          const notificationTitle = '현재 집중상태 : 🫵';
          new Notification(notificationTitle, {
            body: '바람한번 쐬고오는 건 어떨까요?',
          }).onclick = () => console.log('Notification Clicked');
        }
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            const notificationTitle = '현재 집중상태 : 🔥';
            new Notification(notificationTitle, {
              body: '열심히 하고계시네요! 아자아자!',
            });
          }
        });
      }
    });
  };

  const handleClickPush = () => {
    const hiddenBtn = document.getElementById('hiddenBtn') as HTMLButtonElement;
    if (hiddenBtn) {
      hiddenBtn.click();
    }
  };

  useInterval(() => {
    handleClickPush();
  }, PUSH_ALARM_DELAY);

  return (
    <div className={styles.videoBodyContainer}>
      <div className={styles.videoSection}>
        <video id='video-output-2' width={500} className={styles.video} />
        <div className={styles.videoFocusContainer}>
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
          <button id='hiddenBtn' className={styles.hiddenBtn} onClick={handlePushAlarm}></button>
        </div>
      </div>
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
  const UNIT_HOUR = 60 * 60;
  const UNIT_MINUTE = 60;
  return Math.floor((second % UNIT_HOUR) / UNIT_MINUTE)
    .toString()
    .padStart(2, '0');
};

const getSecond = (second: number) => {
  const UNIT_MINUTE = 60;
  return (second % UNIT_MINUTE).toString().padStart(2, '0');
};

// Base64 문자열을 Blob으로 변환하는 함수
const dataURLtoBlob = (dataURL: string) => {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

export default AttentionStatus;
