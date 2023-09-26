import Link from "next/link";
import React from "react";
import Head from "next/head";
import styles from "./camera.module.css";
import RootLayout from "../RootLayout";

const constraints = { audio: false, video: true };

const CameraGuidePage = () => {
  const handleClickRecord = () => {
    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
      // 비디오 트랙을 포함한 MediaStream
      console.log(mediaStream);
      const videoOutput = document.getElementById("video-output");
      if (videoOutput instanceof HTMLVideoElement) {
        videoOutput.srcObject = mediaStream;
        // metadata가 로드될 때 실행되는 이벤트
        videoOutput.onloadedmetadata = function () {
          videoOutput.play();
        };
      }
    });
  };
  handleClickRecord();

  return (
    <RootLayout>
      CameraGuidePage
      <Link href="/home">
        <a>Go to home page</a>
      </Link>
      <video id="video-output" className={styles.video}></video>
    </RootLayout>
  );
};

export default CameraGuidePage;
