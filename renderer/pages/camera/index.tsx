import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./camera.module.css";
import RootLayout from "../RootLayout";

const constraints = { audio: false, video: true };
let scaleFactor = 0.25;

const snapshots = [];

const CameraGuidePage = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
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

  const shoot = () => {
    const video = document.getElementById("video-output") as HTMLVideoElement;
    const output = document.getElementById("output");
    const canvas = capture(video, scaleFactor);
    setImageSrc(canvas.toDataURL());

    snapshots.unshift(canvas);
    output.innerHTML = "";
    for (let i = 0; i < snapshots.length; i++) {
      output.appendChild(snapshots[i]);
    }
  };

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

  useEffect(() => {
    if ("navigator" in window) {
      handleClickRecord();
    }
  }, []);

  return (
    <RootLayout>
      CameraGuidePage
      <Link href="/home">
        <a>Go to home page</a>
      </Link>
      <video id="video-output" width={300} height={300} className={styles.video}></video>
      <button onClick={shoot}>캡쳐하기</button>
      <div id="output" className={styles.output}></div>
      <img src={imageSrc} width={160} height={120}></img>
    </RootLayout>
  );
};

export default CameraGuidePage;
