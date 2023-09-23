import React, { useState } from "react";
import Head from "next/head";
import styles from "./home.module.css";
import Button from "@mui/material/Button";
import LineChart from "../components/Home/LineChart";
import PieChart from "../components/Statistic/PieChart";

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

  const showNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // TODO: 집중상태를 값으로 받아서 값에 따라 푸시알림 보내기
      const notificationTitle = "현재 집중상태 : 🔥";
      new Notification(notificationTitle, {
        body: "오~쫌치는데? 아자아자!",
      }).onclick = () => console.log("Notification Clicked");
      // const notificationTitle = "현재 집중상태 : 🫵";
      // new Notification(notificationTitle, {
      //   body: "엥 지금 집중안하고 뭐함?",
      // }).onclick = () => console.log("Notification Clicked");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission((permission) => {
        console.log(permission);
        if (permission === "granted") {
          new Notification("START ETA", { body: "이제 푸시알림을 받을 수 있습니다." });
        } else {
          alert("Notification denied");
        }
      });
    }
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
        <Button style={{ display: "block" }} onClick={handleClickRecord} variant="contained">
          카메라 촬영
        </Button>

        <Button style={{ display: "block" }} onClick={showNotification} variant="contained">
          푸시 알림
        </Button>
      </div>
      <PieChart />
      <LineChart />
    </React.Fragment>
  );
}

export default Home;
