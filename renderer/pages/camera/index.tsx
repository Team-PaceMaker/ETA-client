import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./camera.module.css";
import RootLayout from "../RootLayout";
import useInterval from "../../hooks/useInterval";
import FONT from "../../constants/fonts";

const constraints = { audio: false, video: true };
const VIDEO_WIDTH = 500;
const VIDEO_HEIGHT = 500;
const CAPTURE_DELAY = 1000;
const IMAGE_WIDTH = 224;
const IMAGE_HEIGHT = 224;

const BUTTON_TEXT = "VIDEO START";
let scaleFactor = 0.25;

const snapshots = [];

const CameraGuidePage = () => {
  const capture = (video: HTMLVideoElement, scaleFactor: number) => {
    if (scaleFactor == null) {
      scaleFactor = 1;
    }
    var w = video.videoWidth * scaleFactor;
    var h = video.videoHeight * scaleFactor;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.scale(-1, 1);
    ctx.translate(-w, 0);
    ctx.drawImage(video, 0, 0, w, h);

    return canvas;
  };

  const captureImage = () => {
    const video = document.getElementById("video-output") as HTMLVideoElement;
    const output = document.getElementById("output");
    const canvas = capture(video, scaleFactor);
    if (canvas.width === 0) return;
    const imageSrc = canvas.toDataURL("image/jpeg", 0.8); // 2번째 인자를 0~1 까지 주면서 화질 조절. 1이 best
    // TODO: 이미지 서버에 전송
    // sendImage(imageSrc);
  };

  const handleClickRecord = () => {
    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
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

  // const stopStreamedVideo = (videoElem: HTMLVideoElement) => {
  //   const stream: MediaStream = videoElem.srcObject;

  //   const tracks = stream.getTracks();

  //   tracks.forEach(function (track) {
  //     track.stop();
  //   });

  //   videoElem.srcObject = null;
  // };

  // 일정간격마다 비디오 캡처
  // useInterval(() => {
  //   captureImage();
  // }, CAPTURE_DELAY);

  useEffect(() => {
    if ("navigator" in window) {
      handleClickRecord();
    }
    return () => {
      const videoOutput = document.getElementById("video-output");
      if (videoOutput instanceof HTMLVideoElement) {
        videoOutput.pause();
      }
    };
  }, []);

  return (
    <RootLayout>
      <div className={styles.cameraBodyContainer}>
        <video
          id="video-output"
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          className={styles.video}
        ></video>
        <Link href="/video">
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

export default CameraGuidePage;
