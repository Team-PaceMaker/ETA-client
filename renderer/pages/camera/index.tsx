import { startRecord, stopRecord } from 'apis/camera';
import AttentionStatus from 'camera/AttentionStatus';
import CameraGuide from 'camera/CameraGuide';
import { attentionState } from 'states/attention';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import RootLayout from '../RootLayout';
import { useRouter } from 'next/router';

const constraints = { audio: false, video: true };
let videoStream: MediaStream;

const CameraPage = () => {
  const router = useRouter();
  const [isStartRecord, setIsStartRecord] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [attentionId, setAttentionId] = useRecoilState(attentionState);

  const handleStartRecord = async () => {
    const id = await startRecord();
    setIsStartRecord(true);
    setAttentionId(id);
  };

  const handleStopRecord = async () => {
    await stopRecord(attentionId);
    router.push('/result');
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
    <>
      {isStartRecord ? (
        <AttentionStatus attentionId={attentionId} handleStopRecord={handleStopRecord} />
      ) : (
        <RootLayout>
          <CameraGuide
            isVideoLoaded={isVideoLoaded}
            isStartRecord={isStartRecord}
            handleStartRecord={handleStartRecord}
          />
        </RootLayout>
      )}
    </>
  );
};

export default CameraPage;
