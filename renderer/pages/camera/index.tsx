import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './camera.module.css';
import RootLayout from '../RootLayout';
import useInterval from '../../hooks/useInterval';
import FONT from '../../constants/fonts';
import { getAttentionStatus } from '../../apis/camera';

const constraints = { audio: false, video: true };
const VIDEO_WIDTH = 600;
const VIDEO_HEIGHT = 500;
const CAPTURE_DELAY = 2000;
const IMAGE_WIDTH = 224;
const IMAGE_HEIGHT = 224;

const BUTTON_TEXT = 'VIDEO START';
const VIDEO_TEXT = '보이는 점선에 맞춰 촬영해주세요';
let scaleFactor = 0.25;
let videoStream: MediaStream;

const CameraGuidePage = () => {
  const [isAttention, setIsAttention] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
    const video = document.getElementById('video-output') as HTMLVideoElement;
    // const output = document.getElementById('output');
    const canvas = capture(video, scaleFactor);
    if (canvas.width === 0) return;
    const imageSrc = canvas.toDataURL('image/jpeg', 0.8); // 2번째 인자를 0~1 까지 주면서 화질 조절. 1이 best

    // Base64 문자열을 Blob으로 변환
    const blob = dataURLtoBlob(imageSrc);

    // Blob 데이터를 FormData에 담아 송신
    const formData = new FormData();
    formData.append('image', blob, 'test.jpeg');
    const attention = await getAttentionStatus(formData);
    if (attention) setIsAttention(true);
    else setIsAttention(false);
  };

  const showCameraGuide = () => {
    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
      const videoOutput = document.getElementById('video-output');
      if (videoOutput instanceof HTMLVideoElement) {
        videoOutput.srcObject = mediaStream;
        videoStream = mediaStream;
        const handlePlayVideo = () => {
          videoOutput.play();
          setIsVideoLoaded(true);
        };
        videoOutput.addEventListener('loadeddata', handlePlayVideo);

        // // metadata가 로드될 때 실행되는 이벤트
        // videoOutput.onloadedmetadata = function () {
        //   videoOutput.play();
        // };
      }
    });
  };

  // function stopVideoStream() {
  //   const videoOutput = document.getElementById('video-output');
  //   if (videoOutput instanceof HTMLVideoElement) {
  //     const tracks = videoStream.getTracks(); // 스트림의 모든 트랙 가져오기
  //     tracks.forEach(function (track) {
  //       track.stop(); // 트랙 종료
  //     });
  //   }
  // }

  // 일정간격마다 비디오 캡처
  useInterval(() => {
    captureImage();
  }, CAPTURE_DELAY);

  useEffect(() => {
    if ('navigator' in window) {
      showCameraGuide();
    }
  }, []);

  return (
    <RootLayout>
      <div className={styles.cameraBodyContainer}>
        <video id='video-output' width={VIDEO_WIDTH} className={styles.video} />
        {!isVideoLoaded && <div className={styles.loadingBlock} />}

        <div className={styles.videoText} style={FONT.BODY1}>
          {VIDEO_TEXT}
        </div>
        <div className={styles.attentionStatus}>{isAttention ? '🥴' : '🫵'}</div>
        <Link href='/video'>
          <div className={styles.buttonContainer} style={FONT.BODY1}>
            {BUTTON_TEXT}
          </div>
        </Link>
      </div>

      {/* <button onClick={captureImage}>캡쳐하기</button> */}
      {/* <div id="output" className={styles.output}></div> */}
      {/* <img src={imageSrc} width={IMAGE_WIDTH} height={IMAGE_HEIGHT}></img> */}
    </RootLayout>
  );
};

// Base64 문자열을 Blob으로 변환하는 함수
function dataURLtoBlob(dataURL: string) {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export default CameraGuidePage;
