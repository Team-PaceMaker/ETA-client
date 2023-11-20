import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import RootLayout from '../RootLayout';
import useInterval from '../../hooks/useInterval';
import FONT from '../../constants/fonts';
import { getAttentionStatus, startTakingVideo, stopTakingVideo } from '../../apis/camera';
import CameraGuide from '../../components/camera/CameraGuide';
import AttentionStatus from '../../components/camera/AttentionStatus';
import { showNotification } from '../../utils/notification';
import { useRecoilState } from 'recoil';
import { attentionState } from '../../states/attention';

const constraints = { audio: false, video: true };
const CAPTURE_DELAY = 1000;
const CAPTURE_DELAY_FREEZE = 100000000;
const IMAGE_WIDTH = 224;
const IMAGE_HEIGHT = 224;

let scaleFactor = 0.25;
let videoStream: MediaStream;

const CameraGuidePage = () => {
  const [isStartRecord, setIsStartRecord] = useState(false);
  const [isAttention, setIsAttention] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const [attentionId, setAttentionId] = useRecoilState(attentionState);
  const [timer, setTimer] = useState(0);

  const handleStartRecord = async () => {
    const id = await startTakingVideo();
    setIsStartRecord(true);
    setAttentionId(id);
  };

  const handleStopRecord = async () => {
    await stopTakingVideo(attentionId);
  };

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
    formData.append('attentionId', attentionId.toString());

    const attention = await getAttentionStatus(formData);
    if (attention) setIsAttention(true);
    else setIsAttention(false);

    // TODO: 집중상태에 따라 푸시알림. 즉각적으로 주는 게 아닌 일정 간격마다 푸시알림.
    // showNotification(attention);
  };

  const showCameraGuide = () => {
    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
      const videoOutput = document.getElementById('video-output');
      if (videoOutput instanceof HTMLVideoElement) {
        videoOutput.srcObject = mediaStream;
        videoStream = mediaStream;

        // metadata가 로드될 때 실행되는 이벤트
        videoOutput.onloadedmetadata = function () {
          videoOutput.play();
          setIsVideoLoaded(true);
        };
      }
    });
  };

  const stopVideoStream = () => {
    const videoOutput = document.getElementById('video-output');
    if (videoOutput instanceof HTMLVideoElement) {
      const tracks = videoStream.getTracks(); // 스트림의 모든 트랙 가져오기
      tracks.forEach(function (track) {
        track.stop(); // 트랙 종료
      });
    }
  };

  // 일정간격마다 비디오 캡처
  useInterval(
    () => {
      captureImage();
      setTimer((prev) => prev + 1);
    },
    isStartRecord ? CAPTURE_DELAY : CAPTURE_DELAY_FREEZE
  );

  useEffect(() => {
    if ('navigator' in window) {
      showCameraGuide();
    }
    return () => {
      setIsStartRecord(false);
      stopVideoStream();
    };
  }, []);

  return (
    <RootLayout>
      {isStartRecord && (
        <AttentionStatus
          isAttention={isAttention}
          handleStopRecord={handleStopRecord}
          timer={timer}
        />
      )}
      <CameraGuide
        isVideoLoaded={isVideoLoaded}
        isStartRecord={isStartRecord}
        handleStartRecord={handleStartRecord}
      />
    </RootLayout>
  );
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

export default CameraGuidePage;
