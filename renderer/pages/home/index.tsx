import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import LineChart from "../../components/Home/LineChart";
import Link from "next/link";
import RootLayout from "../RootLayout";
import FONT from "../../constants/fonts";

function Home() {
  const showNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // TODO: 집중상태를 값으로 받아서 값에 따라 푸시알림 보내기
      // const notificationTitle = "현재 집중상태 : 🔥";
      // new Notification(notificationTitle, {
      //   body: "열심히 하고계시네요! 아자아자!",
      // }).onclick = () => console.log("Notification Clicked");
      const notificationTitle = "현재 집중상태 : 🫵";
      new Notification(notificationTitle, {
        body: "바람한번 쐬고오는 건 어떨까요?",
      }).onclick = () => console.log("Notification Clicked");
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
    <RootLayout>
      <div style={FONT.SLOGAN} className={styles.slogan}>
        <div id="slogan" className={styles.sloganText}>
          어제 미룬 업무
        </div>
        <div className={styles.sloganText}>ETA와 함께하자</div>
      </div>
      <div className={styles.bodyContainer}>
        <LineChart />
        <Link href="/camera">
          <div className={styles.buttonContainer} style={FONT.BODY1}>
            START ETA
          </div>
        </Link>
      </div>
      {/* <button style={{ display: "block" }} onClick={showNotification}>
        푸시 알림
      </button> */}
    </RootLayout>
  );
}

export default Home;
