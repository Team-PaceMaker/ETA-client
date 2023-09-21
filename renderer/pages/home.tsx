import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./home.module.css";

const constraints = { audio: false, video: true };

function Home() {
  const [isVideo, setIsVideo] = useState(false);

  const handleClickRecord = () => {
    setIsVideo((prev) => !prev);
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

  return (
    <React.Fragment>
      <Head>
        <title>ETA(Encourage Time for Attention)</title>
      </Head>
      <div>
        {isVideo ? (
          <video id="video-output" className={styles.video}></video>
        ) : (
          <div style={{ width: 200, height: 200, backgroundColor: "red" }}></div>
        )}
        <button style={{ display: "block" }} onClick={handleClickRecord}>
          카메라 촬영
        </button>
      </div>
    </React.Fragment>
  );
}

export default Home;
